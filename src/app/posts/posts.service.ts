import { Injectable } from '@angular/core';
import {Post} from './post.model';
import {Subject} from 'rxjs'

@Injectable({providedIn:'root'})
export class PostsService{
  private posts: Post[] = [];

  getPosts(){
    // create a new array with the old object
    // array is copied and will not affect the original array
    return this.posts;
  }

  addPost(title:string, content:string){
    const post:Post = {title: title, content: content};
    this.posts.push(post);
  }
}
