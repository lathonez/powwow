import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService } from '../../services/chat';
import { UtilsService } from '../../services/utils';

@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(
    public nav: NavController,
    public chat: ChatService,
    public utils: UtilsService
  ) {}
}
