import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs'
// rxjs are obejcts that help pass data around

@Injectable({providedIn:'root'})
export class PostsService{
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  getPosts(){
    // create a new array with the old object
    // array is copied and will not affect the original array
    return this.posts;
  }

  getPostUpdateListener(){
    //this an object that can listen
    return this.postUpdated.asObservable();
  }

  addPost(title:string, content:string){
    const post:Post = {title: title, content: content};
    this.posts.push(post);
    //emiting
    this.postUpdated.next([...this.posts]);
  }
}
