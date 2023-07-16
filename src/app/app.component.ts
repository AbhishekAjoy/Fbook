import { Component, inject } from '@angular/core';
import { UserService } from './_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fbook';

  userService = inject(UserService);
  router = inject(Router);

  logout(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
