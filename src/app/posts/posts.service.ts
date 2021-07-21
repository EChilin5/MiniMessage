import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs'
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
    this.http.get<{message:string, posts:Post[]}>('http://localhost:3000/api/posts')
    .subscribe( (postData) =>{
      this.posts = postData.posts;
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
    .post<{ message:string }>("http://localhost:3000/api/posts",post)
    .subscribe((responseData)=>{
      console.log(responseData.message);

     // push will only post if subscribe is successful
      this.posts.push(post);
      //emiting
      this.postUpdated.next([...this.posts]);
    });

  }
}
