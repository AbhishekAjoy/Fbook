import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/_services/post.service';
import { UploadService } from 'src/app/_services/upload.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  ngOnInit(): void {
    this.uImgId = this.userName + this.postId;
    this.loadPhoto(this.uphotoid, this.uImgId);
    this.loadPhoto(this.postImgId,this.postId);
  }
  @Output() deleteEvent = new EventEmitter<boolean>();
  @Input() post:string = 'content-loading';
  @Input() userName:string = 'content-loading';
  @Input() date: string = 'content-loading';
  @Input() uphotoid: string = 'content-loading';
  @Input() postImgId:string = '';
  @Input() postId: string = '';
  @Input() userId: string = '';
 
  userPhoto$ = new Observable<Blob>;
  uImgId = '';
  currentUserId = sessionStorage.getItem('userId');
  uploadService = inject(UploadService);
  postService = inject(PostService);
  isAdmin = sessionStorage.getItem('isAdmin');
  deleteHandler(){
    this.postService.deletePost(this.postId).subscribe({
      next: (res) => {
        alert('Post Deleted!');
        this.deleteEvent.emit();
    },
      error: (err) => console.log(err.error.message)
    });
  }
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
