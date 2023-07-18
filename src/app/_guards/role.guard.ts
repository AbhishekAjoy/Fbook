import { CanActivateFn } from '@angular/router';
import { UserService } from '../_services/user.service';
import { inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  let userId = sessionStorage.getItem('userId');
  let isAdminUser:boolean = false;
  if(userId){
    userService.getUserById(userId).subscribe({
      next: (res) => { sessionStorage.setItem('isAdmin',(res.isAdmin??false).toString())},
      error: (e) => { alert('Not an Admin User') }
    });
  }
  isAdminUser = sessionStorage.getItem('isAdmin')==='true';
  return isAdminUser;
};
