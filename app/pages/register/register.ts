import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilsService } from '../../services/utils';

@Component({
  templateUrl: 'build/pages/register/register.html'
})
export class RegisterPage {

  username: string;
  password: string;
  passwordConfirm: string;
  name: string;

  constructor(
    public navCtrl: NavController,
    public utils: UtilsService
  ) {
    // nothing
  }

  register() {

    if (this.password !== this.passwordConfirm) {
      this.utils.alerter('Password mismatch!', 'The two passwords you have supplied do not match', 'OK');
      this.password = '';
      this.passwordConfirm = '';
      return;
    }
  }
}
