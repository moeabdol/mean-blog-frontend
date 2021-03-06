import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class BlogService {
  private _authToken: string;

  constructor(private _http: HttpClient) { }

  createAuthHeaders() {
    this.loadToken();
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._authToken);
    return headers;
  }

  loadToken() {
    this._authToken = localStorage.getItem("token");
  }

  createNewBlog(blog) {
    const headers = this.createAuthHeaders();
    return this._http.post("http://localhost:3000/api/blog", blog,
      { headers });
  }

  getAllBlogPosts() {
    const headers = this.createAuthHeaders();
    return this._http.get("http://localhost:3000/api/blog", { headers });
  }

  getSingleBlogPost(id) {
    const headers = this.createAuthHeaders();
    return this._http.get(`http://localhost:3000/api/blog/${id}`, { headers });
  }

  editBlogPost(id, blog) {
    const headers = this.createAuthHeaders();
    return this._http.put(`http://localhost:3000/api/blog/${id}`, blog,
      { headers });
  }

  deleteBlogPost(id) {
    const headers = this.createAuthHeaders();
    return this._http.delete(`http://localhost:3000/api/blog/${id}`,
      { headers });
  }
}
