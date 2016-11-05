import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Powwow } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ChatService } from '../services/chat';
import { UtilsService } from '../services/utils';

@NgModule({
  declarations: [
    Powwow,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(Powwow)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Powwow,
    LoginPage,
    RegisterPage
  ],
  providers: [
    ChatService,
    UtilsService
  ]
})
export class AppModule {}
