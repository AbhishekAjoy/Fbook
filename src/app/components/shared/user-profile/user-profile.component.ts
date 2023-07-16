import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent{

  uploadFile($event:any) {
    console.log($event.target.files[0]); // outputs the first file
}
    
}
