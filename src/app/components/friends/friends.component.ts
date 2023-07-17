import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Friend } from 'src/app/_models/friend.interface';
import { ReqUserMapping } from 'src/app/_models/types.interface';
import { User } from 'src/app/_models/user.interface';
import { FriendsService } from 'src/app/_services/friends.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  ngOnInit(): void {
    this.requests$ = this.friendService.getAllFriendRequest().pipe(
      map((reqs) =>
        reqs.filter((req) => {
          if (req.userId === this.currentUserId) {
            this.userService.getUserById(req.friendId).subscribe({
              next: (res) => this.users.push({"id": req.id??'', "name": res.firstName + ' '+res.lastName, "email": res.email,"status":req.status, "photoId": res.photoId??'' })
            });
          }
          return req.userId === this.currentUserId;
        })
      )
    );
  }

  friendService = inject(FriendsService);
  userService = inject(UserService);
  requests$ = new Observable<Friend[]>();
  users:Array<ReqUserMapping> = [];
  currentUserId = sessionStorage.getItem('userId');

  count: number[] = [1, 2, 3, 4, 5];
}
