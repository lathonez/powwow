import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import { UtilsService } from '../../services/utils';
import { ContactsPage } from '../contacts/contacts';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public nav: NavController,
    public chat: ChatService,
    public utils: UtilsService
  ) {
    window['login'] = this;
  }

  login() {

    let loginResult: any = {};

    // show the loading spinner as we might have to wait a while to login
    this.utils.showLoadingSpinner('Logging in...');

    // start the login sequence
    this.chat.login(this.username, this.password)

      // store the result from login so we can access it later
      .then((result) => loginResult = result)

      // hide our loading spinner as we can no hand back to the user
      .then(() => this.utils.hideLoadingSpinner())

      // process the result
      .then(() => {

        if (loginResult.error) {
          // =[ login failed!
          this.utils.alerter('Login Failure!', loginResult.error.message, 'OK');
        } else {
          this.nav.push(ContactsPage);
          // successful login, yay!
          console.log('login successful');
        }
      });
  }

  register() {
    // switch to the register page
    this.nav.push(RegisterPage);
  }
}
