import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user.interface';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  today = new Date().toISOString().split('T')[0];
  userService = inject(UserService);

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    dob: new FormControl('', Validators.required),
    gender: new FormControl(''),
    password: new FormControl('', Validators.required),
  });

  onRegister() {
      let data = this.registerForm.value;
      let user: User = {
        firstName: data.firstName??'',
        lastName: data.lastName??'',
        email: data.email??'',
        dob: data.dob??'',
        gender: data.gender??'',
        password: data.password??'',
      };
      this.userService.registerUser(user);
      
    }
}
