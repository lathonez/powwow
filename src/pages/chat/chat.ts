import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import * as moment from 'moment';

let self: ChatPage;

@Component({
  templateUrl: 'chat.html'
})

export class ChatPage {

  nav: NavController;

  // who we're chatting to
  user = null;

  // current line of text we're typing
  line: string;

  // the conversation made up of many lines
  conversation: Array<string> = [];

  // message subscription so we can unsubscribe later
  messageSubscription;

  constructor(app: App, public chat: ChatService, public navParams: NavParams) {
    self = this;

    self.nav = app.getActiveNav();
    // the user that we're chatting to is passed through in the NavParams, store it
    self.user = navParams.data.user;

    self.chat.history(self.user)
      .then(history => this.conversation = history);

    // make sure we get incoming chat notifications
    self.messageSubscription = self.chat.messageEmitter.subscribe(self.receiveMessage);
  }

  ionViewDidLeave() {
    self.messageSubscription.unsubscribe();
  }

  receiveMessage(data) {

    if (data.userId !== self.user.id) {
      // this does not belong to our conversation
      return;
    }

    // add the new message to our conversation array
    self.conversation.push(moment().format('h:mm:ss a') + ' - ' + self.user.login + ': ' + data.message.body);
  }

  scroll() {
    // require('dom-scroll-into-view')($('#scroll-marker')[0], $('.convo .scroll-content')[0]);
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

    // add the message to our conversation so we can see it in the chat window
    self.conversation.push(moment().format('h:mm:ss a') + ' - me: ' + message);
  }
}
