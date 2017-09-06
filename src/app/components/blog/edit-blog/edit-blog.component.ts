import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "edit-blog",
  templateUrl: "./edit-blog.component.html",
  styleUrls: ["./edit-blog.component.css"]
})
export class EditBlogComponent implements OnInit {
  public processing: boolean = false;
  public messageClass: string;
  public message: string;
  public blog: Object = {
    title: String,
    body: String
  };

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  updateBlogSubmit() {
    console.log("update post");
  }

  deletePost() {
    console.log("delete post");
  }

  goBack() {
    this._location.back();
  }
}
