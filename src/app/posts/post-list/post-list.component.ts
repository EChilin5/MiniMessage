import { Component,  OnDestroy,  OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import {Post} from '../post.model';
import { PostsService } from "../posts.service";


@Component({
  selector:'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
//  class PostListComponent implements is a contract in the class
//

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title:'First post', content:"This is the first post"},
  //   {title:'Second post', content:"This is the second post"},
  //   {title:'Third post', content:"This is the third post"},

  // ];
  posts:Post[]=[];
  private postSub:Subscription;

  constructor( public postsService:PostsService){

  }

  //will be automticall launched by angular
  ngOnInit(){
     this.postsService.getPosts();
    //listener to the object

    this.postsService.getPostUpdateListener()
    .subscribe( (posts:Post[])=>{
        this.posts = posts;
    });
  }

  onDelete(postId:string){
      this.postsService.deletePost(postId);
  }


  ngOnDestroy(){
    //THIS will prevent memory leaks from occuring
    this.postSub.unsubscribe();
  }
}
