import { Component,  OnInit } from "@angular/core";
import {Post} from '../post.model';
import { PostsService } from "../posts.service";


@Component({
  selector:'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
//  class PostListComponent implements is a contract in the class
//

export class PostListComponent implements OnInit{
  // posts = [
  //   {title:'First post', content:"This is the first post"},
  //   {title:'Second post', content:"This is the second post"},
  //   {title:'Third post', content:"This is the third post"},

  // ];
  posts:Post[]=[];


  constructor( public postsService:PostsService){

  }

  //will be automticall launched by angular
  ngOnInit(){
    this.posts = this.postsService.getPosts();
  }
}
