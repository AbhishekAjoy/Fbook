import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../_models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private baseURL = 'http://3.17.216.66:3000/';

  registerUser(formData: User){
    this.http.post<User>(this.baseURL + 'users/register',formData).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err)
    });
  }

  login(formData: {email:string, password:string}){
    this.http.post(this.baseURL + 'users/authenticate',formData).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err.error.message)
    });
  }
}
