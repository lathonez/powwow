import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../services/chat';

@Component({
  templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage {

  // who we're chatting to
  user = null;

  // current line of text we're typing
  line: string;

  // the story so far
  conversation: string = `

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in justo eget est dignissim lobortis. Praesent viverra eleifend justo, non hendrerit erat sodales id. Suspendisse imperdiet dui at nibh gravida pulvinar. Fusce facilisis feugiat ex eget commodo. In lacinia, ex et fermentum lobortis, lacus est condimentum velit, sit amet finibus ante justo sed ex. Nulla neque orci, fermentum et justo vitae, condimentum tempor leo. Aliquam sodales non ipsum quis vehicula. Suspendisse non commodo justo. Nullam rutrum fermentum elit, et porta mauris pharetra sit amet. Fusce ut malesuada justo. Curabitur in pharetra mauris.

Sed mollis rutrum luctus. Aenean nec lorem mollis, ornare neque non, cursus orci. Phasellus nec neque at leo tristique tempor. Duis facilisis porta lectus, quis rhoncus justo convallis auctor. Ut lectus odio, pulvinar in turpis quis, tincidunt luctus libero. Etiam egestas facilisis lectus vel venenatis. Fusce dolor tortor, semper ut consectetur et, mattis nec leo. Sed a laoreet enim, sed tempor lectus.

Vestibulum volutpat a sapien id pellentesque. Maecenas at diam id risus mattis pellentesque. Nullam vitae mollis nibh. Vestibulum id fringilla nunc. Vestibulum at imperdiet massa. Quisque dolor massa, euismod in lacus at, iaculis iaculis erat. Praesent id dictum dolor. Etiam a sapien in odio lacinia fermentum. Etiam nec ante nisi. Sed sed pulvinar quam. Mauris finibus id eros in lacinia. Nulla suscipit consequat dolor suscipit aliquam. Curabitur vitae congue ante. Ut purus dolor, finibus sit amet mi iaculis, elementum commodo orci. Morbi porttitor quam vel fermentum feugiat.

Duis lectus odio, hendrerit ut neque finibus, porttitor commodo magna. Proin iaculis luctus tristique. Praesent eget aliquet libero. Aenean fermentum lorem eros, vel tempus erat rhoncus quis. Aenean massa felis, aliquam ut risus iaculis, vehicula feugiat augue. Donec porttitor purus tempor purus viverra, id finibus lacus rhoncus. Sed lobortis lacus ultricies tincidunt posuere. Mauris rhoncus ligula eu elit feugiat pharetra. Etiam consequat metus nec lobortis accumsan. Curabitur feugiat bibendum nunc sit amet pharetra. Phasellus et accumsan quam. Nunc sit amet elit sem. Aliquam blandit ligula magna, ac vehicula arcu vestibulum nec.

Ut lacus tellus, laoreet non pulvinar sit amet, eleifend id lacus. Etiam lacinia consequat ultricies. Integer enim nisl, elementum a mi consectetur, consectetur consequat eros. Praesent et luctus massa, id iaculis nisl. Aliquam ac accumsan neque. Sed rutrum orci dolor, ut lobortis ex fermentum a. Duis vehicula suscipit felis ut scelerisque. Aliquam tincidunt volutpat blandit. Curabitur aliquet efficitur mi in dictum. Sed at placerat ligula. Cras ligula lacus, congue vitae purus in, luctus egestas libero. Nam at felis ac nisl tempus consequat. Mauris ac bibendum ipsum, aliquet luctus tortor. Nunc malesuada aliquet risus, sit amet sagittis purus ultricies ac.
`;

  constructor(public nav: NavController, public chat: ChatService, public navParams: NavParams) {
    console.log(navParams);
    this.user = navParams.data.user;
  }

  sendMessage() {
    console.log('Sending: ' + this.line);
  }
}
