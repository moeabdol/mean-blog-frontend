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
              private _authService: AuthService) { }

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
  }
}
