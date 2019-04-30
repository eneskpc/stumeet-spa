import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { MessageForSend } from "src/app/models/messageForSend";
import { SystemParams } from "src/app/SystemParams";
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  public static connection: signalR.HubConnection = null;

  constructor(private auth: AuthService) { }

  public currentMessageList = Array<>();

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
      ChatService.connection.on("messageReceived", (model: MessageForSend) => {
      });
    });
  }

  public async sendMessage(model: MessageForSend) {
    if (ChatService.connection == null) {
      return null;
    }
    return await ChatService.connection.send("newMessage", model);
  }
}
