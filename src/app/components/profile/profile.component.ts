import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  public id: string;
  public username: string;
  public email: string;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this._authService.getProfile()
      .subscribe(
        data => {
          this.id = data["id"];
          this.username = data["username"];
          this.email = data["email"];
        },
        err => {
          if (err["error"]["message"] === "Invalid token!") {
            this._router.navigate(["/login"]);
          }
        }
      );
  }
}
