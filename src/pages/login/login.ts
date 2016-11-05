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

  constructor(
    public nav: NavController,
    public chat: ChatService,
    public utils: UtilsService
  ) {

  }
}
