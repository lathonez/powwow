import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController } from 'ionic-angular';
import { ChatService } from '../../services/chat';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  loadingSpinner; // reference to our loading spinner for login

  constructor(
    public nav: NavController,
    public alert: AlertController,
    public toast: ToastController,
    public chat: ChatService,
    public loading: LoadingController
  ) {
    window['homePage'] = this;
  }

  // when page is loaded
  ionViewDidEnter() {
    // should really work without the timeout, but who's counting?
    setTimeout(this.showLoginPrompt.bind(this), 0);
  }

  showLoginPrompt() {
    let prompt = this.alert.create({
      title: 'Login',
      message: 'Enter your login details, or hit Register',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Register',
          handler: data => {
            console.log('Register');
          }
        },
        {
          text: 'Login',
          handler: this.login.bind(this)
        }
      ]
    });
    return prompt.present();
  }

  checkLoginDetails(username, password) {

    // if username or password is missing, show a toast to the user
    if (!username || !password) {
      this.toaster('Invalid login details - username and password are required');
      return false;
    }

    return true;
  }

  showLoadingSpinner() {
    let loadingSpinner = this.loading.create({
      content: 'Logging in...'
    });
    loadingSpinner.present();
    // save a reference to the loading spinner, we'll need to cancel it later
    this.loadingSpinner = loadingSpinner;
  }

  toaster(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  login(data) {

    if (!this.checkLoginDetails(data.username, data.password)) {
      // return false to keep login prompt open
      return false;
    }

    this.showLoadingSpinner();

    this.chat.login(data.username, data.password, this.loginCallback.bind(this));
  }

  loginCallback(error, result) {

    // TODO - make the async shit here easier to digest

    // hide our loading spinner
    this.loadingSpinner.dismiss()
      .then(() => {// wait for the loading spinner to vanish before showing anything else
        if (error) {
          this.showLoginPrompt()
            .then(() => {
              this.toaster(this.getNiceErrorMessage(error));
            });
        } else {
          // Yay! we're logged in, let's do stuff
          console.log(result);
        }
      });
  }

  getNiceErrorMessage(error) {
    switch (error.code) {
      case 401:
        return 'Invalid username / password';
      default:
        return `There was an error logging in CODE: ${error.code} - ${error.message}`;
    }
  }
}
