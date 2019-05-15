import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { MessageForSend } from "src/app/models/messageForSend";
import { SystemParams } from "src/app/SystemParams";
import { AuthService } from '../auth-service/auth.service';
import { MessageForReceived } from 'src/app/models/messageForReceived';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  public static connection: signalR.HubConnection = null;

  constructor(private auth: AuthService,
    private http: HttpClient) { }

  public currentMessageList = Array<MessageForReceived>();
  public currentMessageGroupList = Array<any>();
  public currentGroupParticipants = Array<any>();

  public startConnection() {
    if (ChatService.connection == null) {
      ChatService.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${SystemParams.apiRoot}/chat`, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => this.auth.getToken()
        }).build();
    }
    ChatService.connection.start().then(() => {
      ChatService.connection.on("messageReceived", (model: MessageForReceived) => {
        this.currentMessageList.push(model);
        setTimeout(() => {
          document.querySelector('.ks-messages.ks-messenger__messages .ks-body.ks-scrollable').scrollTo(0, document.querySelector('.ks-messages.ks-messenger__messages .ks-body.ks-scrollable').scrollHeight);
        }, 50);
      });
    });
  }

  public getAllMessagesByGroupId(groupId) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/messages/getbyid/${groupId}`, {
      headers: headers
    });
  }

  public getGroups() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/messages/groups`, {
      headers: headers
    });
  }

  public getGroupById(groupId: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/messages/group/${groupId}`, {
      headers: headers
    });
  }

  public getParticipantsByGroupId(groupId: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Authorization", this.auth.getToken());
    return this.http.get(`${SystemParams.apiRoot}/messages/group/${groupId}/participants`, {
      headers: headers
    });
  }

  public async sendMessage(model: MessageForSend) {
    if (ChatService.connection == null) {
      return null;
    }
    return await ChatService.connection.send("newMessage", model);
  }

  public async logout() {
    return await ChatService.connection.stop();
  }
}
