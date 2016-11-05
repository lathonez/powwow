import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import { ChatPage } from '..//chat/chat';

@Component({
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  // we use the ChatService in the html to show all users
  constructor(public nav: NavController, public chat: ChatService) {}

  startChat(user) {
    // open the chat page for the user we've clicked on
    this.nav.push(ChatPage, {user: user});
  }
}
