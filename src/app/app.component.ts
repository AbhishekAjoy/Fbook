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
    window.sessionStorage.clear();
    this.userService.user$.next('');
    this.userService.isAdmin$.next(false);
    this.router.navigateByUrl('/');
  }
}
