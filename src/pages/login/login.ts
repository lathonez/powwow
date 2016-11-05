import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import { UtilsService } from '../../services/utils';
import { ContactsPage } from '../contacts/contacts';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public nav: NavController,
    public chat: ChatService,
    public utils: UtilsService
  ) {}

  login() {
    console.log('LOGIN');
    console.log('USERNAME: ' + this.username);
    console.log('PASSWORD: ' + this.password);
  }

  register() {
    console.log('REGISTER');
  }
}
