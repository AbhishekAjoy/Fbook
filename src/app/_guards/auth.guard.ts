import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  if (window.localStorage.getItem('auth-token')) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
