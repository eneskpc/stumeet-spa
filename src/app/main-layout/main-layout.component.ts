import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat-service/chat.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [
    "./main-layout.component.css"
  ]
})
export class MainLayoutComponent implements OnInit {

  constructor(public auth: AuthService,
    public chat: ChatService,
    private router: Router) { }

  ngOnInit() {
    if (!this.auth.loggedIn()) {
      this.router.navigateByUrl("/giris");
    }
  }

  public testSendMessage() {
    this.chat.sendMessage({
      userId: 25,
      message: "Selamalar ben kurat"
    });
  }

  public logout() {
    this.auth.logout();
    this.router.navigateByUrl('giris');
  }

}
