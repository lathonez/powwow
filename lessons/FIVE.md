## Lesson Objectives

* [Send Chat](#send-chat)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-five...lesson-six)

## Send Chat

* Pass user through to chat page and display name in header

**pages/chat/chat.ts**:

```javascript
export class ChatPage {

  // who we're chatting to
  user = null;

  constructor(public nav: NavController, public chat: ChatService, public navParams: NavParams) {
    self = this;

    // the user that we're chatting to is passed through in the NavParams, store it
    self.user = navParams.data.user;
  }
```

**pages/chat/chat.html**:

```html
    <ion-title>Chat with {{user.full_name}}</ion-title>
```

* Basic chat interface:

**pages/chat/chat.html**:

```html
<ion-content>
  <ion-scroll scrollY="true" class="convo">
  </ion-scroll>
  <ion-list>
    <form (ngSubmit)="sendMessage()">
      <ion-item>
        <ion-input [(ngModel)]="line" name="line" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <button ion-button icon-left block><ion-icon name="send"></ion-icon>Send</button>
      </ion-item>
    </form>
  </ion-list>
</ion-content>
```

* Send message skeleton:

**pages/chat/chat.ts**:

```javascript
  // who we're chatting to
  user = null;

  // current line of text we're typing
  line: string;

...

  sendMessage() {

    // don't send if we've nothing to send!
    if (!self.line) {
      return;
    }

    // our message is whatever is contained in the line input
    let message = self.line;

    // clear the input for the user to type something new
    self.line = '';

    console.log(message);
  }
```

* Create sendMessage function in chat service and plug together (observe log):

**services/chat.ts**:

```javascript
  send(message, recipientId) {
    let msg = {
      type: 'chat',
      body: message,
      extension: {
        save_to_history: 1,
      },
      senderId: self.currentUserId,
      markable: 1
    };

    // message sending is fire and forget in QuickBlox (no async callback)
    return self.QB.chat.send(recipientId, msg);
  }
```

**pages/chat/chat.ts**:

```javascript
    // clear the input for the user to type something new
    self.line = '';

    // send the message (fire and forget!)
    self.chat.send(message, self.user.id);
```