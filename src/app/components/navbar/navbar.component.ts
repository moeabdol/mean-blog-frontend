import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { FlashMessagesService } from "angular2-flash-messages";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  constructor(private _authService: AuthService,
              private _router: Router,
              private _flashMessagesService: FlashMessagesService) { }

  onLogoutClicked() {
    this._authService.logout();
    this._flashMessagesService.show("Logged out successfully", {
      cssClass: "alert alert-success"
    });
    this._router.navigate(["/home"]);
    return false;
  }
}
