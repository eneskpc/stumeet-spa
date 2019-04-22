import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForLogin } from 'src/app/models/userForLogin';
import { SystemParams } from 'src/app/SystemParams';
import { UserForRegister } from 'src/app/models/userForRegister';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public userDetail: UserForRegister;

  public login(model: UserForLogin, handler: Function = null): Observable<any> {
    return this.http.post(`${SystemParams.apiRoot}/auth/login`, model);
  }

  public register(model: UserForRegister): Observable<any> {
    return this.http.post(`${SystemParams.apiRoot}/auth/login`, model);
  }

  public loggedIn() {

  }

  public saveToken(value) {
    localStorage.setItem(SystemParams.tokenKey, value);
  }

  public getToken() {
    return localStorage.getItem(SystemParams.tokenKey);
  }

}
