import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  @ViewChild("username") public elementRef: ElementRef;
  public form: FormGroup;
  public message: string;
  public messageClass: string;
  public processing: boolean = false;
  public emailValid: boolean;
  public emailMessage: string;
  public usernameValid: boolean;
  public usernameMessage: string;

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      email: ["", Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      username: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])],
      password: ["", Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      confirmation: ["", Validators.required]
    }, {
      validator: this.passwordAndConfirmationMatch("password", "confirmation")
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }

  validateEmail(control): { [s: string]: boolean } {
    const regExp = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    if (regExp.test(control.value)) {
      return null;
    } else {
      return { "invalidEmail": true };
    }
  }

  passwordAndConfirmationMatch(password, confirmation) {
    return (group: FormGroup) => {
      if (group.controls[password].value ===
          group.controls[confirmation].value) {
        return null;
      } else {
        return { "mismatch": true };
      }
    };
  }

  enableForm() {
    this.form.controls["email"].enable();
    this.form.controls["username"].enable();
    this.form.controls["password"].enable();
    this.form.controls["confirmation"].enable();
  }

  disableForm() {
    this.form.controls["email"].disable();
    this.form.controls["username"].disable();
    this.form.controls["password"].disable();
    this.form.controls["confirmation"].disable();
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();

    const user = {
      email: this.form.get("email").value,
      username: this.form.get("username").value,
      password: this.form.get("password").value
    };
    this._authService.registerUser(user)
      .subscribe(
        data => {
          this.messageClass = "alert alert-success";
          this.message = data["message"];
          setTimeout(() => {
            this._router.navigate(["/login"]);
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

  checkEmail() {
    this._authService.checkEmail(this.form.get("email").value)
      .subscribe(
        data => {
          if (data) {
            if (data["found"]) {
              this.emailValid = false;
            } else {
              this.emailValid = true;
            }
            this.emailMessage = data["message"];
          }
        },
        err => console.log(err)
      );
  }

  checkUsername() {
    this._authService.checkUsername(this.form.get("username").value)
      .subscribe(
        data => {
          if (data) {
            if (data["found"]) {
              this.usernameValid = false;
            } else {
              this.usernameValid = true;
            }
            this.usernameMessage = data["message"];
          }
        },
        err => console.log(err)
      );
  }
}
