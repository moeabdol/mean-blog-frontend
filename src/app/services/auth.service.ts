import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/do";

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) { }

  registerUser(user) {
    return this._http.post("http://localhost:3000/api/users/register", user);
  }
}
