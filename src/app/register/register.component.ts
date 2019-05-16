import { Component, OnInit } from '@angular/core';
import { UserForRegister } from '../models/userForRegister';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { DialogService } from '../services/dialog-service/dialog.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public auth: AuthService,
    public dialog: DialogService,
    private router: Router) { }


  public model: UserForRegister = null;

  public buttonText: string = "Kaydı Tamamla";
  public process = false;

  ngOnInit() {
    this.model = {
      name: "",
      surname: "",
      birthDate: "",
      email: "",
      password: "",
      passwordRepeat: "",
      phoneNumber: ""
    };
  }

  public register($event: KeyboardEvent = null) {
    if (($event == null || $event.keyCode == 13) && !this.process) {
      this.process = true;
      this.buttonText = '<i class="la la-refresh la-spin mr-2"></i> Lütfen Bekleyin...';
      this.auth.register(this.model).subscribe(data => {
        this.router.navigateByUrl('/giris');
        this.process = false;
        this.buttonText = "Kaydı Tamamla";
      }, error => {
        switch (error.status) {
          case 401:
            this.dialog.show("Kullanıcı adın veya şifren yanlış.");
            break;
        }
        this.buttonText = "Kaydı Tamamla";
        this.process = false;
      });
    }
  }

}
