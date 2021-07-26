import { Component, OnInit, } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;


  // Post service is injected into this component
  constructor(public postsService:PostsService, public route: ActivatedRoute){}

  ngOnInit(){
    /// alternate to either create post or edit
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has('postId')){
            this.mode = 'edit';
            this.postId = paramMap.get('postId');
        }else{
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }
    this.postsService.addPost( form.value.title, form.value.content);
    form.resetForm();
  }
}
