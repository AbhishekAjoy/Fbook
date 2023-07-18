import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Friend } from 'src/app/_models/friend.interface';
import { ReqUserMapping } from 'src/app/_models/types.interface';
import { User } from 'src/app/_models/user.interface';
import { FriendsService } from 'src/app/_services/friends.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit{
  ngOnInit(): void {
    this.requests$ = this.friendService.getAllFriendRequest().pipe(
      map((reqs) =>
        reqs.filter((req) => {
          if (req.userId === this.currentUserId && req.status !== 'You are friend') {
            this.userService.getUserById(req.friendId).subscribe({
              next: (res) => this.users.push({"id": req.id??'', "name": res.firstName + ' '+res.lastName, "email": res.email,"status":req.status, "photoId": res.photoId??'', "userId": req.userId, "friendId":req.friendId }),
              error: (err) => console.log(err.error.message)
            });
          }
          return req.userId === this.currentUserId;
        })
      )
    );
    this.users$ = this.userService.getAllUsers().pipe(map(u => u.filter((u) => this.users.filter((i) => i.userId !== u.id && i.userId !== this.currentUserId))));
  }

  userService = inject(UserService);
  friendService = inject(FriendsService);
  users$ = new Observable<User[]>;
  requests$ = new Observable<Friend[]>();
  users:Array<ReqUserMapping> = [];
  currentUserId = sessionStorage.getItem('userId');
}
