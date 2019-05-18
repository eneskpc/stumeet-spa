import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SystemParams } from 'src/app/SystemParams';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private auth: AuthService,
    private http: HttpClient) { }

  public getAllEvents() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/events`, {
      headers: headers
    });
  }

  public getEventById(eventId: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/events/${eventId}`, {
      headers: headers
    });
  }

  public getParticipantOfEventById(eventId: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/events/${eventId}/participants`, {
      headers: headers
    });
  }

  public updateEventParticipant(eventId: number, model: any) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.put(`${SystemParams.apiRoot}/events/${eventId}/participants`, model, {
      headers: headers
    });
  }

}
