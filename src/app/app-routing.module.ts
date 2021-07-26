import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

//
const routes: Routes = [
  // import the type of component that will be directed
  { path: '', component: PostListComponent },
  {path:'create', component:PostCreateComponent },
  {path:'edit/:postId', component:PostCreateComponent }

];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  /// export it in order to make it aware of thr route
  exports: [RouterModule]
})

export class AppRoutingModule{

}
