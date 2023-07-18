import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/_services/upload.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  ngOnInit(): void {
    this.loadPhoto(this.uphotoid, this.uphotoid)
    this.loadPhoto(this.postImgId,this.postId)
  }
  
  @Input() post:string = 'content-loading';
  @Input() userName:string = 'content-loading';
  @Input() date: string = 'content-loading';
  @Input() uphotoid: string = 'content-loading';
  @Input() postImgId:string = '';
  @Input() postId: string = '';

  uImgId = 'u' + this.postId;
  userPhoto$ = new Observable<Blob>;
  uploadService = inject(UploadService);

  loadPhoto(photoid:string, imgId:string){
    if(photoid !== undefined && photoid.length === 24){
      this.userPhoto$ = this.uploadService.getPhotoById(photoid);
      var urlCreator = window.URL || window.webkitURL;
      this.userPhoto$.subscribe({
        next: (res) => {
          var imageUrl = urlCreator.createObjectURL(res);
          let img = document.getElementById(imgId) as HTMLImageElement;
          if(img){
            img.src = imageUrl;
          }
          
        },
        error: (err) => console.log(err.error.message)
      })
      
    }
  }
  
}
