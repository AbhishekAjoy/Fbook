import {  Component, OnInit, inject } from '@angular/core';
import {Observable, map} from 'rxjs';
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
    let getPosts$ = this.postService.getAllPosts();
    this.posts$ = getPosts$.pipe(map(x => x.sort((a, b) => {
      return <any>new Date(b.createdDate??'') - <any>new Date(a.createdDate??'');
    })));
    

  }
  posts$ = new Observable<Post[]>;
  userPhotos:string[] = [];
  postDesc: string = '';
  files:File[] = [];
  
  constructor(public postService: PostService){}
  onFileSelected(event:any) {

    if(this.files.length  === 0){
      this.files.push(event.target.files[0]);
    }
    else{
      alert('No more files can be uploaded');
    }
  }
  createPost(){
    
    let post: Post = {
      post:this.postDesc,
      userId:'abcd',
      userName: sessionStorage.getItem('name')??'',
      userPhotoId: 'photoid',
      userImageId: this.files?'filePresent':'',
      isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')??'false'),
      isActive: true,
      profession: 'user'
    };

    this.postService.createPost(post);
  }

}
