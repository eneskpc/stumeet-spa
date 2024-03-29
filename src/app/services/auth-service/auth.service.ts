import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserForLogin } from 'src/app/models/userForLogin';
import { SystemParams } from 'src/app/SystemParams';
import { UserForRegister } from 'src/app/models/userForRegister';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.jwt = new JwtHelperService();
  }

  public currentUser: any = null;
  public jwt: JwtHelperService;

  public login(model: UserForLogin, handler: Function = null): Observable<any> {
    return this.http.post(`${SystemParams.apiRoot}/auth/login`, model);
  }

  public register(model: UserForRegister): Observable<any> {
    return this.http.post(`${SystemParams.apiRoot}/auth/register`, model);
  }

  public getUser() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.getToken());
    return this.http.get(`${SystemParams.apiRoot}/users/mine`, {
      headers: headers
    });
  }

  public loggedIn(): boolean {
    let token = localStorage.getItem(SystemParams.tokenKey);
    if (token)
      return !this.jwt.isTokenExpired(token);
    return false;
  }

  public logout() {
    localStorage.removeItem(SystemParams.tokenKey);
  }

  public saveToken(value) {
    localStorage.setItem(SystemParams.tokenKey, value);
  }

  public getToken() {
    return localStorage.getItem(SystemParams.tokenKey);
  }

}
