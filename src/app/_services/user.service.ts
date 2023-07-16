import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../_models/user.interface';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../_models/login-response.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseURL = environment.API_URL;
  private router = inject(Router);

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
          sessionStorage.setItem("name",response.firstName);
          sessionStorage.setItem("isAdmin",response.isAdmin.toString());
          localStorage.setItem('auth-token', response.token);
          this.router.navigateByUrl('/home');
        },
        error: (err) => console.error(err.error.message),
      });
  }

  getAllUsers(){
    return this.http.get<User[]>(this.baseURL + 'users/');
  }

  getUserById(userId: string){
    return this.http.get<User>(this.baseURL + 'users/' + userId);
  }

  getUserByEmail(email:string){
    return this.http.post(this.baseURL+ 'users/finduserbyemail', {email: email});
  }

  updateUserPhotoId(updatedUser: Partial<User>){
    return this.http.post(this.baseURL + 'users/updateduserphotoId', updatedUser)
  }

  updateUser(updatedUser:Partial<User>){
    return this.http.put(this.baseURL + 'users/' + updatedUser.id, updatedUser );
  }
}
