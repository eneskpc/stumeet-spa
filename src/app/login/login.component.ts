import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { UserForLogin } from '../models/userForLogin';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog-service/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService,
    public dialog: DialogService,
    public router: Router) { }

  public model: UserForLogin = {
    userName: "",
    password: ""
  }

  public process = false;

  ngOnInit() {
    if (this.auth.loggedIn()) {
      this.router.navigateByUrl("/haber-kaynagi");
    }
  }

  public login() {
    if (!this.process) {
      this.process = true;
      this.auth.login(this.model).subscribe(data => {
        this.auth.saveToken(data["token"]);
        this.router.navigateByUrl("/haber-kaynagi");
        this.process = false;
      }, error => {
        switch (error.status) {
          case 401:
            this.dialog.show("Kullanıcı adın veya şifren yanlış.");
            break;
        }
        this.process = false;
      });
    }
  }

}
