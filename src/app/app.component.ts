import { AfterViewInit, Component, DoCheck, OnInit, inject } from '@angular/core';
import { UserService } from './_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck{
  ngDoCheck(): void {
    this.isAdmin = sessionStorage.getItem('isAdmin') ==='true';
  }

  title = 'fbook'; 

  userService = inject(UserService);
  router = inject(Router);
  isAdmin:boolean = false;

  logout(){
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
