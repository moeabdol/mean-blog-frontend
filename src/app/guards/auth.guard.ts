import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  public redirectUrl: string;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (this._authService.loggedIn()) {
      return true;
    }
    this.redirectUrl = state.url;
    this._router.navigate(["/login"]);
    return false;
  }
}
