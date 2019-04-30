import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat-service/chat.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [
    "./main-layout.component.scss"
  ]
})
export class MainLayoutComponent implements OnInit {

  constructor(public auth: AuthService,
    public chat: ChatService,
    private router: Router) { }

  public currentMessageContent: string = "";

  ngOnInit() {
    if (!this.auth.loggedIn()) {
      this.router.navigateByUrl("/giris");
    } else {
      this.chat.startConnection();
      this.currentMessageContent = "";
    }
  }

  public testSendMessage() {
    this.chat.sendMessage({
      groupId: 35,
      messageContent: this.currentMessageContent
    }).then(() => {
      this.currentMessageContent = "";
    });
  }

  public logout() {
    this.auth.logout();
    this.router.navigateByUrl('giris');
  }

}
