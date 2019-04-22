import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() {
    alertify.defaults.glossary.title = "Uyarı";
    alertify.defaults.glossary.ok = "Tamam";
    alertify.defaults.glossary.cancel = "İptal";
  }

  show(message: string) {
    alertify.alert(message);
  }

  showSuccess(message: string) {
    alertify.success(message);
  }

  showDanger(message: string) {
    alertify.error(message);
  }

}
