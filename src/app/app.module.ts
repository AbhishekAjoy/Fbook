import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserProfileComponent } from './components/shared/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { NetworkComponent } from './components/network/network.component';
import { FriendsComponent } from './components/friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    HomeComponent,
    NetworkComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
