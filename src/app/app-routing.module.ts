import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './_guards/auth.guard';
import { NetworkComponent } from './components/network/network.component';
import { FriendsComponent } from './components/friends/friends.component';
import { SettingComponent } from './components/setting/setting.component';
import { UsersComponent } from './components/users/users.component';
import { roleGuard } from './_guards/role.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [{
  path: '',
  component: RegisterComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'forgot-password',
  component: ForgotPasswordComponent,
},
{
  path: 'reset-password',
  component: ResetPasswordComponent,
},
{
  path: 'home',
  component: HomeComponent,
  canActivate: [authGuard]
},
{
  path: 'network',
  component: NetworkComponent,
  canActivate: [authGuard]
},
{
  path: 'friends',
  component: FriendsComponent,
  canActivate: [authGuard]
},
{
  path: 'user-list',
  component: UsersComponent,
  canActivate: [authGuard,roleGuard]
},
{
  path: 'settings',
  component: SettingComponent,
  canActivate: [authGuard]
},
{
  path: '**',
  component: RegisterComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
