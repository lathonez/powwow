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
}