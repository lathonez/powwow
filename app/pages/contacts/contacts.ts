import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import { ChatPage } from '..//chat/chat';

@Component({
  templateUrl: 'build/pages/contacts/contacts.html'
})
export class ContactsPage {
  constructor(public nav: NavController, public chat: ChatService) {
  }

  startChat(user) {
    this.nav.push(ChatPage, {user: user});
  }
}
