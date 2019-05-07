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
  public currentGroupTitle: string = "";
  public currentMemberCount: string = "";
  public groupLoading: boolean = true;
  public messageLoading: boolean = true;
  public intro: boolean = false;

  ngOnInit() {
    this.currentMessageContent = "";
    this.chat.currentMessageList = [];
    this.route.paramMap.subscribe(params => {
      this.currentGroupId = parseInt(params.get("id"));
      if (this.currentGroupId > 0)
        this.chat.getAllMessagesByGroupId(this.currentGroupId)
          .subscribe(response => {
            this.chat.currentMessageList = response["data"];
            this.messageLoading = false;
          });
      else{
        this.messageLoading = false;
        this.intro = true;
      } 
      this.chat.getGroups().subscribe(response => {
        this.chat.currentMessageGroupList = response["data"];
        this.groupLoading = false;
      });
      this.chat.getGroupById(this.currentGroupId).subscribe(response => {
        let currentGroup = response['data'];
        console.log(currentGroup);
        this.currentGroupTitle = currentGroup[0]['groupName'];
      });
    });
  }

  changeGroup() {
    this.messageLoading = true;
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
