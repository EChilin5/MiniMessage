import { Component, OnInit, } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
import { mimeType } from "./mime-type.validator";

import { PostsService } from "../posts.service";

@Component({
  selector:'app-post-create',
  templateUrl:'./post-create.component.html',
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
  isLoading =false;
  // form group combines all the elements of a form
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;
  post: Post;


  // Post service is injected into this component
  constructor(public postsService:PostsService, public route: ActivatedRoute){}

  ngOnInit(){
    this.form = new FormGroup({
      // configure the form
      // validators is a type of array of validates that need to be added
      // all inputs are part of form control
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content':new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'image': new FormControl(null, {validators:[Validators.required], asyncValidators: [mimeType]})
    })
    /// alternate to either create post or edit
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has('postId')){
            this.mode = 'edit';
            this.postId = paramMap.get('postId');
            this.isLoading = true;
            this.postsService.getPost(this.postId).subscribe(postData=>{
              this.isLoading = false;
              this.post={
                id: postData._id,
                title: postData.title,
                content: postData.content,
                imagePath: null
              };
              //overides values for the form control
              this.form.setValue({
                'title':this.post.title,
                'content':this.post.content
              })
            });
        }else{
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    //convert an image to a data url

    const reader = new FileReader();
   // the following function is asynchronous
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);


  }

  onSavePost(){

    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    console.log(this.mode);
    if(this.mode === 'create'){
      this.postsService.addPost( this.form.value.title, this.form.value.content, this.form.value.image);
    }else{
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }

    this.form.reset();

  }
}

