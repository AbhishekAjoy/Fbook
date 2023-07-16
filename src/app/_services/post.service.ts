import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Post } from '../_models/post.interface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../_models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  private http = inject(HttpClient);
  private baseURL = environment.API_URL;

  createPost(postData: Post){
    this.http.post<Post>(this.baseURL + 'posts/createpost',postData).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.error(err.error.message)
    });
  }

  getAllPosts(){
     return this.http.get<Post[]>(this.baseURL + 'posts/');
  }

  getPostByUserId(userId: string){
    return this.http.post(this.baseURL + 'posts/findpostbyuserid', {id: userId});
  }
  
  getPostByPostId(postId: string){
    return this.http.get(this.baseURL + 'posts/'+ postId);
  }

  updateBulkPosts(updatePayload: {}){
    return this.http.post<Post>(this.baseURL + 'posts/updatemanyposts', updatePayload);
  }

  updatePost(updatedPost: Post){
    return this.http.put<Post>(this.baseURL + 'posts/' + updatedPost.id,updatedPost);
  }

  deletePost(deletedPost: Post){
    return this.http.delete<Post>(this.baseURL + 'posts/'+ deletedPost.id);
  }
}
