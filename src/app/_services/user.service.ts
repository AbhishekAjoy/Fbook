import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../_models/user.interface';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../_models/login-response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseURL = 'http://3.17.216.66:3000/';
  private router = inject(Router);
  user$ = new BehaviorSubject('');
  isAdmin$ = new BehaviorSubject(false);

  registerUser(formData: User) {
    this.http.post<User>(this.baseURL + 'users/register', formData).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err),
    });
  }

  login(formData: { email: string; password: string }) {
    this.http
      .post<LoginResponse>(this.baseURL + 'users/authenticate', formData)
      .subscribe({
        next: (response) => {
          this.user$.next(response.firstName);
          this.isAdmin$.next(response.isAdmin);
          sessionStorage.setItem('auth-token', response.token);
          this.router.navigateByUrl('/home');
        },
        error: (err) => console.error(err.error.message),
      });
  }
}
