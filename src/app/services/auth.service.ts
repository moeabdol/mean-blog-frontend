import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) { }

  registerUser(user) {
    return this._http.post("http://localhost:3000/api/users/register", user);
  }

  checkUsername(username) {
    return this._http.get(`http://localhost:3000/api/users/checkusername/${username}`);
  }

  checkEmail(email) {
    return this._http.get(`http://localhost:3000/api/users/checkemail/${email}`);
  }
}
