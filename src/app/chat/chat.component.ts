import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public chat: ChatService) { }

  public currentMessageContent: string = "";

  ngOnInit() {
    this.currentMessageContent = "";
  }

  public sendMessage(groupId: number) {
    this.chat.sendMessage({
      groupId: groupId,
      messageContent: this.currentMessageContent
    }).then(() => {
      this.currentMessageContent = "";
    });
  }

}
