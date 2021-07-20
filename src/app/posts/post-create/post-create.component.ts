import { Component, } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent{
  enteredContent = '';
  enteredTitle = '';


  // Post service is injected into this component
  constructor(public postsService:PostsService){}

  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }
    console.log(form.value.title + " " + form.value.content);
    this.postsService.addPost( form.value.title, form.value.content);
  }
}
