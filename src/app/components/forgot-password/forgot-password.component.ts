import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl(
      new Date().toISOString().split('T')[0],
      Validators.required
    ),
  });

  private userService = inject(UserService);
  private router = inject(Router);

  forgotPasswordHandler() {
    console.log(this.forgotPasswordForm.value);
    let email = this.forgotPasswordForm.value.email;
    let dob = this.forgotPasswordForm.value.dob;
    if (email && dob) {
      this.userService.getUserByEmail(email).subscribe({
        next: (res) => {
          if (res[0].dob.split('T')[0] === dob) {
            sessionStorage.setItem('userId',res[0].id??"");
            this.router.navigateByUrl('/reset-password');
          } else {
            alert('Invalid Email or DOB');
          }
        },
        error: (e) => console.log(e.error.message),
      });
    }
  }
}
