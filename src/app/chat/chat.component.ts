import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat.ks-column.ks-page',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public chat: ChatService,
    private route: ActivatedRoute) { }

  public currentMessageContent: string = "";
  public currentGroupId: number = 0;

  ngOnInit() {
    this.currentMessageContent = "";
    this.chat.currentMessageList = [];
    this.route.paramMap.subscribe(params => {
      this.currentGroupId = parseInt(params.get("id"));
      if (this.currentGroupId > 0)
        this.chat.getAllMessagesByGroupId(this.currentGroupId).subscribe(data => {
          this.chat.currentMessageList = data;
        });
    });
  }

  onKeydown(event) {
    if (event.key === "Enter" && this.currentMessageContent.trim() != '') {
      this.sendMessage();
    }
  }

  public sendMessage(isEnter: boolean = false) {
    if (this.currentGroupId > 0 && this.currentMessageContent.trim() != '')
      this.chat.sendMessage({
        groupId: this.currentGroupId,
        messageContent: this.currentMessageContent
      }).then(() => {
        this.currentMessageContent = "";
      });
    else
      this.currentMessageContent = "";
  }

}
