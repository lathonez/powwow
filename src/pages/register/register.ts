import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import { UtilsService } from '../../services/utils';

@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {

  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;

  constructor(
    public nav: NavController,
    public chat: ChatService,
    public utils: UtilsService
  ) {
    // nothing
  }

  register() {

    let registerResult: any = {};

    if (this.password !== this.passwordConfirm) {
      this.utils.alerter('Password mismatch!', 'The two passwords you have supplied do not match', 'OK');
      this.password = '';
      this.passwordConfirm = '';
      return;
    }

    // show the loading spinner as we might have to wait a while to login
    this.utils.showLoadingSpinner('Registering...');

    // start the login sequence
    this.chat.register(this.username, this.password, this.name, this.email)

      // store the result from login so we can access it later
      .then((result) => registerResult = result)

      // hide our loading spinner as we can no hand back to the user
      .then(() => this.utils.hideLoadingSpinner())

      // process the result
      .then(() => {

        if (registerResult.error) {
          // =[ login failed!
          this.utils.alerter('Registration Failure!', registerResult.error.message, 'OK');
        } else {
          // successful register, yay! - lets go back to login so the user can login
          this.nav.pop();
        }
      });
  }
}
