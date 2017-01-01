import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import * as moment from 'moment';

let self: ChatPage;

@Component({
  templateUrl: 'chat.html'
})

export class ChatPage {

  // who we're chatting to
  user = null;

  // current line of text we're typing
  line: string;

  constructor(public nav: NavController, public chat: ChatService, public navParams: NavParams) {
    self = this;

    // the user that we're chatting to is passed through in the NavParams, store it
    self.user = navParams.data.user;
  }

  sendMessage() {

    // don't send if we've nothing to send!
    if (!self.line) {
      return;
    }

    // our message is whatever is contained in the line input
    let message = self.line;

    // clear the input for the user to type something new
    self.line = '';

    // send the message (fire and forget!)
    self.chat.send(message, self.user.id);
  }
}
