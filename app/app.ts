import { Component } from '@angular/core';
import { Platform, ionicBootstrap, NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { ChatService } from './services/chat';
import { UtilsService } from './services/utils';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ChatService, NavController, UtilsService]
})
export class MyApp {

  public rootPage: any;

  constructor(private platform: Platform) {

    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
