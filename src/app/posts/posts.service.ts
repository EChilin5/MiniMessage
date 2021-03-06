import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
// rxjs are obejcts that help pass data around
import {HttpClient} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class PostsService{
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router ){}

  getPosts(){
    // create a new array with the old object
    // array is copied and will not affect the original array
    // [...this.post]

    // get will change it to js
    this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      // this will be wrapped to an observable which will
      // hold all the post
      return postData.posts.map(post =>{
       // this object will then be stored in an observable
        return{
          title:post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath
        };
      })
    }))
    .subscribe( (transformedPost) =>{
      this.posts = transformedPost;
      this.postUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    //this an object that can listen
    return this.postUpdated.asObservable();
  }

  getPost(id:String){

    // this will just find the specific id post
    // that will be added to a new js object
    return this.http.get<{_id:string, title:string, content:string, imagePath:string}>("http://localhost:3000/api/posts/"+id);
  }

  addPost(title:string, content:string, image:File){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);


    this.http
    .post<{ message:string, post: Post }>(
      "http://localhost:3000/api/posts",
      postData
      )

    .subscribe((responseData)=>{
      const post:Post = {
         id:responseData.post.id,
         title: title,
         content:content,
         imagePath: responseData.post.imagePath
        };

     // push will only post if subscribe is successful
      this.posts.push(post);
      //emiting
      this.postUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });

   }

   updatePost(id:string, title:string, content:string, image:File|string){
    let postData: Post| FormData;
    if(typeof(image) === 'object'){
       postData = new FormData();
       postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
     }else{
         postData = {id: id, title: title, content:content, imagePath:image};
     }
     console.log(title + " " + content);
      this.http.put("http://localhost:3000/api/posts/"+id, postData)
      .subscribe(response => {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex(p=>p.id === id);
        const post:Post={
          id: id,
          title: title,
           content:content,
           imagePath: "response.imagePath"
        }
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
   }

   deletePost(postId:string){
     this.http.delete("http://localhost:3000/api/posts/"+postId)
     .subscribe(()=>{
       const updatedPosts = this.posts.filter(post => post.id != postId);
       this.posts = updatedPosts;
       this.postUpdated.next([...this.posts]);
     })
   }
}
