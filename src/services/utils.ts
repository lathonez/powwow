import { Injectable } from '@angular/core';
import { AlertController, App, LoadingController, NavController } from 'ionic-angular';

@Injectable()

export class UtilsService {

  nav: NavController;
  loadingSpinner;

  constructor(
    public app: App,
    public alert: AlertController,
    public loading: LoadingController
  ) {
    this.nav = app.getActiveNav();
  }

  showLoadingSpinner(message) {
    this.loadingSpinner = this.loading.create({
      content: message
    });
    return this.loadingSpinner.present();
  }

  hideLoadingSpinner() {
    return this.loadingSpinner.dismiss();
  }

  alerter(title, message, buttonText) {
    let alert = this.alert.create({
      title: title,
      subTitle: message,
      buttons: [buttonText]
    });
    alert.present();
  }
}