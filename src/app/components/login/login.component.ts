import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', Validators.required)
  });

  private userService = inject(UserService);

  login(){
    let formData = {
      email: this.loginForm.value.email??'',
      password: this.loginForm.value.password??''
    }
    this.userService.login(formData);
  }
}
