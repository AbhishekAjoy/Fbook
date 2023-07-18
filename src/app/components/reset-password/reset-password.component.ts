import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  currentUserId = sessionStorage.getItem('userId');
  userService = inject(UserService);
  router = inject(Router)

  onSubmit(tform:any){
    console.log(tform.form.value);
    if(this.currentUserId){
      let updatedUser = {id:this.currentUserId, password: tform.form.value.password}
      this.userService.updateUser(updatedUser).subscribe({
        next: (res) => alert('Password Updated'),
        error: (e) => console.log(e.error.message)
      })
    }
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/login')

  }
}
