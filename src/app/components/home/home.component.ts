import {  Component, OnInit, inject } from '@angular/core';
import {Observable, finalize, map, take} from 'rxjs';
import { Post } from 'src/app/_models/post.interface';
import { PostService } from 'src/app/_services/post.service';
import { UploadService } from 'src/app/_services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.getPosts();
  }
  posts$ = new Observable<Post[]>;
  uploadFile$ = new Observable<any>;
  userPhotos:string[] = [];
  postDesc: string = '';
  files:File[] = [];
  postImgId = '';
  postService = inject(PostService);
  uploadService = inject(UploadService);

  onFileSelected(event:any) {

    if(this.files.length  === 0){
      this.files.push(event.target.files[0]);
    }
    else{
      alert('No more files can be uploaded');
    }
  }
  getUploadId(){
      const formData = new FormData();
      formData.append('picture', this.files[0]);
      this.uploadFile$ = this.uploadService.uploadFile(formData);
  }
  createPostHandler(){
    if(this.files.length > 0){
      this.getUploadId();
    this.uploadFile$.pipe(take(1),finalize(() => this.createPost())).subscribe({
      next:(res) => this.postImgId = res.uploadId??''
    })
    }
    else{
      this.createPost();
    }
  }
  createPost(){

      let post: Post = {
        post:this.postDesc,
        userId: sessionStorage.getItem('userId')??'',
        userName: sessionStorage.getItem('name')??'',
        userPhotoId: localStorage.getItem('photoId')??'',
        postImageId: this.postImgId,
        isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')??'false'),
        isActive: true,
        profession: 'user'
      };
  
      this.postService.createPost(post);
      this.getPosts();
  }
  getPosts(){
    let getPosts$ = this.postService.getAllPosts();
    this.posts$ = getPosts$.pipe(map(x => x.sort((a, b) => {
      return <any>new Date(b.createdDate??'') - <any>new Date(a.createdDate??'');
    })));
  }

}
