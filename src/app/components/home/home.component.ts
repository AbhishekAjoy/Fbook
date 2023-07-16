import { ChangeDetectorRef, Component, DoCheck, NgZone, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Post } from 'src/app/_models/post.interface';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
    console.log(this.posts$);

  }
  posts$ = new Observable<Post[]>;
  postDesc: string = '';
  files:File[] = [];
  constructor(public postService: PostService, private changeDetectorRef: ChangeDetectorRef){}
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
      userImageId: this.files[0].name,
      isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')??'false'),
      isActive: true,
      profession: 'user'
    };

    this.postService.createPost(post);
  }

}
