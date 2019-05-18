import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth-service/auth.service';
import { SystemParams } from 'src/app/SystemParams';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  public getAllPosts() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/posts`, {
      headers: headers
    });
  }

}