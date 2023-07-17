import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.interface';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit{
  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

  userService = inject(UserService);
  users$ = new Observable<User[]>;
}
