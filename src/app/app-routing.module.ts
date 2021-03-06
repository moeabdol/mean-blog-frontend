import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BlogComponent } from "./components/blog/blog.component";
import { EditBlogComponent } from "./components/blog/edit-blog/edit-blog.component";
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/not-auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "blog",
    component: BlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "blog/edit/:id",
    component: EditBlogComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
