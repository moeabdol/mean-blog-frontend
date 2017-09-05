import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  public authToken: string;
  public user: Object;

  constructor(private _http: HttpClient) { }

  registerUser(user) {
    return this._http.post("http://localhost:3000/api/users/register", user);
  }

  loginUser(user) {
    return this._http.post("http://localhost:3000/api/users/login", user);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  checkUsername(username) {
    return this._http.get(`http://localhost:3000/api/users/checkusername/${username}`);
  }

  checkEmail(email) {
    return this._http.get(`http://localhost:3000/api/users/checkemail/${email}`);
  }

  storeUserDate(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  loadToken() {
    this.authToken = localStorage.getItem("token");
  }

  createAuthHeaders() {
    this.loadToken();
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.authToken);
    return headers;
  }

  getProfile() {
    const headers = this.createAuthHeaders();
    return this._http.get("http://localhost:3000/api/users", { headers });
  }
}
