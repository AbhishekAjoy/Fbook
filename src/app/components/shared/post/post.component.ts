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
    if(this.uphotoid !== undefined && this.uphotoid.length === 24){
      this.userPhoto$ = this.uploadService.getPhotoById(this.uphotoid);
      var urlCreator = window.URL || window.webkitURL;
      this.userPhoto$.subscribe({
        next: (res) => {
          var imageUrl = urlCreator.createObjectURL(res);
          let img = document.getElementsByClassName("user-photo")[this.index] as HTMLImageElement;
          if(img){
            img.src = imageUrl;
          }
          
        }
      })
    }
  }
  
  @Input() post:string = 'content-loading';
  @Input() userName:string = 'content-loading';
  @Input() date: string = 'content-loading';
  @Input() uphotoid: string = 'content-loading';
  @Input() index:number = 0;

  userPhoto$ = new Observable<Blob>;
  uploadService = inject(UploadService);

  
  
}
