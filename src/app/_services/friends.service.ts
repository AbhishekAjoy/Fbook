import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Friend } from '../_models/friend.interface';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private http = inject(HttpClient);
  private baseURL = environment.API_URL;

  createRequest(request: Friend){
    console.log(request);
    return this.http.post<Friend>(this.baseURL + 'friends/createrequest', request);
  }

  updateFriendRequestById(updatedRequest: Friend){
    console.log(updatedRequest);
    return this.http.put(this.baseURL + 'friends/' + updatedRequest.id, updatedRequest);
  }

  getAllFriendRequest(){
    return this.http.get<Friend[]>(this.baseURL + 'friends/');
  }

  getFriendByRequestById(id: string){
    return this.http.get<Friend>(this.baseURL + 'friends/' + id);
  }
}
