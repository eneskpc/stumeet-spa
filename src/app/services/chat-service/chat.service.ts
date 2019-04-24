import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { MessageForChat } from 'src/app/models/messageForChat';
import { SystemParams } from 'src/app/SystemParams';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public static connection: signalR.HubConnection = null;

  constructor() {
    if (ChatService.connection == null) {
      ChatService.connection = new signalR.HubConnectionBuilder().withUrl(`${SystemParams.apiRoot}/chat`).build();
      ChatService.connection.start().catch(err => console.log(err));
      ChatService.connection.on("messageReceived", (userId: number, message: string) => {
        console.log("UserId : ", userId);
        console.log("Message : ", message);
      });
    }
  }

  public sendMessage(model: MessageForChat) {
    if (ChatService.connection == null)
      console.log("ula bu boş ya la");
    ChatService.connection.send("newMessage", model.userId, model.message)
      .then(() => {
        console.log("UserId : ", model.userId);
        console.log("Message : ", model.message);
      });
  }

}
