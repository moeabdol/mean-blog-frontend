import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { BlogService } from "../../services/blog.service";

@Component({
  selector: "blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  public form: FormGroup;
  public processingNewPost: boolean = false;
  public submittingNewPost: boolean = false;
  public loadingBlogPosts: boolean = false;
  public messageClass: string;
  public message: string;

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

  newBlogForm() {
    this.processingNewPost = true;
  }

  reloadBlogPosts() {
    this.loadingBlogPosts = true;
    // Get All Blogs
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
}
