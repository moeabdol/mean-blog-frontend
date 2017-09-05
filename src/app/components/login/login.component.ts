import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { AuthGuard } from "../../guards/auth.guard";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("username") public elementRef: ElementRef;
  public form: FormGroup;
  public message: string;
  public messageClass: string;
  public processing: boolean;
  public previousUrl: string;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _authGuard: AuthGuard) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    if (this._authGuard.redirectUrl) {
      this.previousUrl = this._authGuard.redirectUrl;
      this._authGuard.redirectUrl = undefined;
      this.messageClass = "alert alert-danger";
      this.message = "You must be logged in to view that page";
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  enableForm() {
    this.form.controls["username"].enable();
    this.form.controls["password"].enable();
  }

  disableForm() {
    this.form.controls["username"].disable();
    this.form.controls["password"].disable();
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      username: this.form.get("username").value,
      password: this.form.get("password").value
    };

    this._authService.loginUser(user)
      .subscribe(
        data => {
          this.messageClass = "alert alert-success";
          this.message = data["message"];
          this._authService.storeUserDate(data["token"], data["user"]);
          setTimeout(() => {
            if (this.previousUrl) {
              this._router.navigate([this.previousUrl]);
            } else {
              this._router.navigate(["/profile"]);
            }
          }, 2000);
        },
        err => {
          this.messageClass = "alert alert-danger";
          this.message = err["error"]["message"];
          this.processing = false;
          this.enableForm();
        }
      );
  }
}
