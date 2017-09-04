import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

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

  onSubmit() {
    console.log(this.form);
  }
}
