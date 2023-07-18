import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Friend } from 'src/app/_models/friend.interface';
import { FriendsService } from 'src/app/_services/friends.service';
import { UploadService } from 'src/app/_services/upload.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss']
})
export class FriendProfileComponent implements OnInit{
  ngOnInit(): void {
    if(this.uphotoid !== undefined && this.uphotoid.length === 24){
      this.userPhoto$ = this.uploadService.getPhotoById(this.uphotoid);
      var urlCreator = window.URL || window.webkitURL;
      this.userPhoto$.subscribe({
        next: (res) => {
          var imageUrl = urlCreator.createObjectURL(res);
          let img = document.getElementById(this.id) as HTMLImageElement;
          if(img){
            img.src = imageUrl;
          }
          
        },
        error: (err) => console.log(err.error.message)
      })
    }
  }

  @Input() name = 'content-loading';
  @Input() email = 'content-loading';
  @Input() id = 'content-loading';
  @Input() status = 'Send Request';
  @Input() uphotoid = '';
  @Input() friendId = '';
  friendService = inject(FriendsService);
  uploadService = inject(UploadService);
  userPhoto$ = new Observable<Blob>;

  RequestHandler(){
    let request:Friend = {"userId":"", "friendId":"","status":""};
    if(this.status === 'Accept Request'){
      request = {
        "id": this.id,
        "userId": sessionStorage.getItem('userId')??'',
        "friendId": this.friendId,
        "status": 'You are friend'
      }
      console.log(request);
      this.friendService.updateFriendRequestById(request).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err.error.message)
      });
      this.status = 'You are friend';
    }
    else{
      request = {
        "id": this.id,
        "userId": sessionStorage.getItem('userId')??'',
        "friendId": this.friendId,
        "status": 'Request Pending'
      }
      this.friendService.createRequest(request).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.error.message)
    });
    this.status = 'Request Pending';
    }
    
  }

  getFriendDetails(){
    this.friendService.getFriendByRequestById(this.id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err.error.message)
    });
  }


}
