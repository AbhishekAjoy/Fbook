import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/_services/upload.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  ngOnInit(): void {
    let uphotoid = localStorage.getItem('photoId');
    if(uphotoid !== undefined && uphotoid?.length === 24){
      this.userPhoto$ = this.uploadService.getPhotoById(uphotoid);
      var urlCreator = window.URL || window.webkitURL;
      this.userPhoto$.subscribe({
        next: (res) => {
          var imageUrl = urlCreator.createObjectURL(res);
          let img = document.getElementById("profile-image") as HTMLImageElement;
          if(img){
            img.src = imageUrl;
          }
          
        }
      })
    }
  }

  files: File[] = [];
  userPhoto$ = new Observable<Blob>;
  private uploadService = inject(UploadService);
  private userService = inject(UserService);
  userName = sessionStorage.getItem('name');

  onFileSelected(event:any) {

    if(this.files.length  === 0){
      this.files.push(event.target.files[0]);
    }
    else{
      this.files[0] = event.target.files[0];
    }
    let img = document.getElementById('profile-image') as HTMLImageElement;
    img.src = URL.createObjectURL(event.target.files[0]);
    const formData = new FormData();
    formData.append('picture', this.files[0]);
    this.uploadService.uploadFile(formData).subscribe({
      next: (res) => this.userService.updateUserPhotoId({'id': sessionStorage.getItem('userId')??'', 'photoId':res['uploadId']}).subscribe({
        next: (uploadres) => console.log(uploadres)
      })
    })
  }
    
}
