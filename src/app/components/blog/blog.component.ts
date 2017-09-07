import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { JwtHelper } from "angular2-jwt";

import { BlogService } from "../../services/blog.service";

@Component({
  selector: "blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  public form: FormGroup;
  public processingNewPost: boolean = false;
  public processingDeletePost: boolean = false;
  public submittingNewPost: boolean = false;
  public loadingBlogPosts: boolean = false;
  public messageClass: string;
  public message: string;
  public blogPosts: Object;
  public currentUserUsername: string;

  constructor(private _formBuilder: FormBuilder,
              private _blogService: BlogService) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      title: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
        this.validateAlphaNumeric
      ])],
      body: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ])]
    });

    this.getAllBlogPosts();
    this.getCurrentUseaUsernamer();
  }

  getCurrentUseaUsernamer() {
    const token = localStorage.getItem("token");
    const jwtHelper = new JwtHelper();
    this.currentUserUsername = jwtHelper.decodeToken(token).username;
  }

  validateAlphaNumeric(control: FormControl): { [s: string]: boolean } {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    if (regExp.test(control.value)) {
      return null;
    } else {
      return { "invalidAlphaNumeric": true };
    }
  }

  enableNewBlogForm() {
    this.form.controls["title"].enable();
    this.form.controls["body"].enable();
  }

  disableNewBlogForm() {
    this.form.controls["title"].disable();
    this.form.controls["body"].disable();
  }

  onBlogSubmit() {
    this.submittingNewPost = true;
    this.disableNewBlogForm();

    const blog = {
      title: this.form.get("title").value,
      body: this.form.get("body").value
    };

    this._blogService.createNewBlog(blog)
      .subscribe(
        data => {
          this.messageClass = "alert alert-success";
          this.message = data["message"];
          this.getAllBlogPosts();
          setTimeout(() => {
            this.processingNewPost = false;
            this.submittingNewPost = false;
            this.form.reset();
            this.enableNewBlogForm();
          }, 2000);
        },
        err => {
          this.messageClass = "alert alert-danger";
          this.message = err["errors"]["message"];
          this.submittingNewPost = false;
          this.enableNewBlogForm();
        }
      );
  }

  getAllBlogPosts() {
    this._blogService.getAllBlogPosts()
      .subscribe(
        data => {
          this.blogPosts = data;
        },
        err => {
          this.messageClass = "alert alert-danger";
          this.message = err["errors"]["message"];
        }
      );
  }

  newBlogForm() {
    this.processingNewPost = true;
  }

  reloadBlogPosts() {
    this.loadingBlogPosts = true;
    this.getAllBlogPosts();
    setTimeout(() => {
      this.loadingBlogPosts = false;
    }, 4000);
  }

  draftComment() {
  }

  goBack() {
    this.processingNewPost = false;
    this.form.reset();
  }

  deleteBlogPost(id) {
    if (confirm("Are you sure to delete " + id)) {
      this.processingDeletePost = true;
      this._blogService.deleteBlogPost(id).
        subscribe(
          data => {
            this.messageClass = "alert alert-success";
            this.message = data["message"];
            setTimeout(() => {
              this.getAllBlogPosts();
              this.processingDeletePost = false;
            }, 2000);
          },
          err => {
            this.messageClass = "alert alert-danger";
            this.message = err["error"]["message"];
          }
        );
    }
  }
}
