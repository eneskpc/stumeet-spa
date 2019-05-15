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
      phoneNumber: ""
    };
  }

}
