import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
// rxjs are obejcts that help pass data around
import {HttpClient} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({providedIn:'root'})
export class PostsService{
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

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
          id: post._id
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

  addPost(title:string, content:string){
    const post:Post = {id:null, title: title, content: content};
    this.http
    .post<{ message:string, postId: string }>("http://localhost:3000/api/posts",post)

    .subscribe((responseData)=>{
      const id = responseData.postId;
      /// this will just updated the specific reference and not overide the entire object
      post.id = id;
     // push will only post if subscribe is successful
      this.posts.push(post);
      //emiting
      this.postUpdated.next([...this.posts]);
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
