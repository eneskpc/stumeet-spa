import { Component, OnInit } from '@angular/core';
import { UserForRegister } from '../models/userForRegister';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { DialogService } from '../services/dialog-service/dialog.service';
import * as moment from 'moment';
import flatpickr from "flatpickr";
import { Turkish } from "flatpickr/dist/l10n/tr";
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
    moment.locale('tr');
    flatpickr("#birth-date", {
      "locale": Turkish,
      "dateFormat": "Z",
      "altInput": true,
      "altFormat": "d M Y",
      "maxDate": moment().subtract(16, 'year').format()
    });
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
