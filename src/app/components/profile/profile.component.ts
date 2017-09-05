import { Component, OnInit } from "@angular/core";

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

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getProfile()
      .subscribe(
        data => {
          this.id = data["id"];
          this.username = data["username"];
          this.email = data["email"];
        },
        err => {
          console.log(err);
        }
      );
  }
}
