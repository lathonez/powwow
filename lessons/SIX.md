## Lesson Objectives

* [Receive Chat](#receive-chat)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-six...lesson-seven)

## Receive Chat

* Add conversation array and render it in the chat window

**pages/chat/chat.ts**:

```javascript
  // current line of text we're typing
  line: string;

  // the conversation made up of many lines
  conversation: Array<string> = [];

  ...

    // send the message (fire and forget!)
    self.chat.send(message, self.user.id);

    // add the message to our conversation so we can see it in the chat window
    self.conversation.push(moment().format('h:mm:ss a') + ' - me: ' + message);
```

**pages/chat/chat.html**:

```html
  <ion-scroll scrollY="true" class="convo">
    <p *ngFor="let line of conversation">{{line}}</p>
```

* Receive messages

**services/chat.ts**:

```javascript
  setupListeners() {
    // set up observables so we can receive inbound events (messages!) from the server

    // message observable
    self.QB.chat.onMessageListener = function(userId, message) {

      // when we receive a message, our observable should emit the data
      self.messageEmitter.emit({userId: userId, message: message});
    };
  }

  ...

  connect(session, password) {

    // store the current userId so we can use it to lookup who we are
    self.currentUserId = session.user_id;

    // setup event listeners
    self.setupListeners();
```

**pages/chat/chat.ts**:

```javascript
  // message subscription so we can unsubscribe later
  messageSubscription;

  constructor(public nav: NavController, public chat: ChatService, public navParams: NavParams) {
    self = this;

    // the user that we're chatting to is passed through in the NavParams, store it
    self.user = navParams.data.user;

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
```

* Add placeholder html

**pages/chat/chat.html**

```html
    <ion-input [(ngModel)]="line" placeholder="Say something to {{user.login}}" name="line" type="text">
```