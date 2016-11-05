import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../services/chat';

@Component({
  templateUrl: 'chat.html'
})

export class ChatPage {

  constructor(public nav: NavController, public chat: ChatService, public navParams: NavParams) {}
}
