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
}
