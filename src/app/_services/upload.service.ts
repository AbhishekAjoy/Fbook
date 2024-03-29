import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private http = inject(HttpClient);
  private baseURL = environment.API_URL;

  uploadFile(formData:any){
    const HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data"})
    }
    return this.http.post<any>(this.baseURL + 'files/uploadfile', formData);
  }

  getPhotoById(photoId: string){
    return this.http.get(this.baseURL + 'files/' + photoId, {responseType: 'blob'});
  }
}
