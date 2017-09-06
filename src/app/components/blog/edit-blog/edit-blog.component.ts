import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";

import { BlogService } from "../../../services/blog.service";

@Component({
  selector: "edit-blog",
  templateUrl: "./edit-blog.component.html",
  styleUrls: ["./edit-blog.component.css"]
})
export class EditBlogComponent implements OnInit {
  public processing: boolean = false;
  public messageClass: string;
  public message: string;
  public loading: boolean = true;
  public blog: Object = {
    title: String,
    body: String
  };

  constructor(private _location: Location,
              private _blogService: BlogService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {
    const id = this._route.snapshot.params.id;
    this._blogService.getSingleBlogPost(id)
      .subscribe(
        data => {
          this.blog = data;
          this.loading = false;
        },
        err => {
          this.messageClass = "alert alert-danger";
          this.message = err["error"]["message"];
        }
      );
  }

  updateBlogSubmit() {
    this.processing = true;
    const id = this._route.snapshot.params.id;
    this._blogService.editBlogPost(id, this.blog)
      .subscribe(
        data => {
          this.messageClass = "alert alert-success";
          this.message = data["message"];
          setTimeout(() => {
            this._router.navigate(["/blog"]);
          }, 2000);
        },
        err => {
          this.messageClass = "alert alert-danger";
          this.message = err["error"]["message"];
          this.processing = false;
        }
      );
  }

  deletePost() {
    console.log("delete post");
  }

  goBack() {
    this._location.back();
  }
}
