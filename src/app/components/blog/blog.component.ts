import { Component, OnInit } from "@angular/core";

@Component({
  selector: "blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"]
})
export class BlogComponent implements OnInit {
  public processingNewPost: boolean = false;
  public loadingBlogPosts: boolean = false;

  constructor() { }

  ngOnInit() {
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
}
