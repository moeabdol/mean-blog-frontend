import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { FlashMessagesModule } from "angular2-flash-messages";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
