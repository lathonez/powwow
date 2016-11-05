import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Powwow } from './app.component';
import { ContactsPage } from '../pages/contacts/contacts';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ChatService } from '../services/chat';
import { UtilsService } from '../services/utils';

@NgModule({
  declarations: [
    Powwow,
    ContactsPage,
    ChatPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(Powwow)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Powwow,
    ContactsPage,
    ChatPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    ChatService,
    UtilsService
  ]
})
export class AppModule {}
