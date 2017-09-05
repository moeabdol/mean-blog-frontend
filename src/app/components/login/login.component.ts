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

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
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
          console.log(data);
          this.messageClass = "alert alert-success";
          this.message = data["message"];
          this._authService.storeUserDate(data["token"], data["user"]);
          setTimeout(() => {
            this._router.navigate(["/dashboard"]);
          }, 2000);
        },
        err => {
          console.log(err);
          this.messageClass = "alert alert-danger";
          this.message = err["error"]["message"];
          this.processing = false;
          this.enableForm();
        }
      );
  }
}
