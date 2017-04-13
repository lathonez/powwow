## Lesson Objectives

* [Receive Chat](#receive-chat)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-six...lesson-seven)
* [Screenshots](#screenshots)
* [Next Lesson](#next-lesson)

## New concepts being addressed

* Using external libraries (momentjs)
* Arrays (in depth)
* String concatenation
* Listeners
* Event Emitters (observables)
* Lifecycle Events
* HTML Placeholders

## Receive Chat

We're nearly ready to receive chat messages, but at the moment we aren't even showing the messages we are sending. To do this, we're going to maintain an array of lines, which make up a conversation. Last time we added a single line variable, and sent that line successfully to the chat server. Now we need to add a conversation array, to which we'll push every line we send.

To make our chat window easier to navigate for our users, we should prefix the messages with the time they were sent. To do that, we're going to use an external library called momentjs. There are many reasons we might want to use external libraries in our code, often they just make our lives as programmers that much easier. The native Javascript date functions are kinda horrible, and momentjs makes doing things with times and dates in Javascript much easier. Show the students the [momentjs docs](http://momentjs.com/), they can experiment with the different kinds of formatting to use in their app. We don't need to put the day in - we'll do that in our chat history lesson next week.

This is also one of the few times we've really used arrays in anger. This one is quite simple - the conversation is a list of lines in the conversation. Each time we send or receive a message, we'll want to add it to the conversation array, by `push`ing it in.

Also notice how we're adding the `+ ' - me: ' +` bit. Ask the students what they think that is for? Why does it say "me" (because the message is from us!)? We're doing `string concatenation` here, which basically means adding a bunch of words together. The students may have done this before in scratch, but it will be helpful to do some examples on the board to demonstrate how it works. `'a' + 'b' + 'c' = 'abc';`

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

Now we've added our conversation class variable, and pushed our messages into it with the appropriate formatting, we want to display that array in our scrolling conversation window. To do this we'll use template looping (we used this previously to loop over our contacts).

What this code means is simply: "For every line in the conversation, create a new paragraph (`<p></p>`) and print our line in the paragraph. If the students test their code now, they should see the messages they send appear on the screen.

**pages/chat/chat.html**:

```html
  <ion-scroll scrollY="true" class="convo">
    <p *ngFor="let line of conversation">{{line}}</p>
```

To receive messages, we need to `listen` to messages from the server. This is very similar conceptually to `broadcast` and `receive` messages in scratch. You can broadcast messages all day, but it doesnt matter if no one is listening using the `receive` message code.

The QuickBlox API provides us with an `onMessageListener` function. We can set that function to be whatever we want, and the API will invoke that function with the `userId` and the `message` that has been received.

We'll create a `setupListeners` function, which we'll use to make sure our listeners are listening when we connect to the chat server.

Additionally, we're going to create an `observable`. This is a totally new concept and will be quite confusing along with the listeners above, so spend some time on it. Draw out on the board the relationship between the different listeners, and how a message gets from the chat server through the code to the chat page.

An `observable` is something you `subscribe` to. We're going to create an `observable` in our `ChatService`, and our `ChatPage` is going to `subscribe` to it. It works just like a subscription in real life - a magazine subscription is the best comparison. Each time the observable `emit`s something, every subscriber will get a copy.

So here, we're saying: "Each time I get a message from the chat server (`onMessageListener`), my observable (`self.messageEmitter`) will send that message out to whoever is listening (`ChatPage).

Chronologically:

1. Chat server sends a message
2. `ChatService` is notified via the API's `onMessageListener`
3. `ChatService` sends the message to any `subscribers` via it's `messageEmitter`

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

Now we've setup our observable, we can subscribe to it in our `ChatPage`. There's a lot going on here:

* We create a function called `receiveMessage`, which will be notified any time we receive a message from the observable. This is straightforward - very similar to the code we added earlier in the lesson for sending messages, with two key differences. Firstly, we `return` early (we covered this in the contacts list lesson) if the message isn't meant for us. Make sure the students understand this. The chat server will notify of us about every message being sent to the account we've logged in to. We may have multiple conversations going on at once, they aren't all relevant here. Secondly, instead of the "me: " bit, we use the user's name who sent us the message
* We `subscribe` to the `observable` we just created in our chat service, so that each time it `emit`s a message, our `receiveMessage` function (above) will get invoked. Ask the students why we might want to keep a reference to our subscription? Do we ever need to unsubscribe
* Finally, we create a function called `ionViewDidLeave`.  This is a special lifecycle function supported by the framework. Show the students the [lifecycle documentation](https://ionicframework.com/docs/api/navigation/NavController/) and briefly explain the page's lifecycle. When we navigate away from the page, we need to make sure we `unsubscribe` from the observable. Otherwise, when we come back, we'll get notified about chat messages multiple times (this is a frequent bug - if the students get duplicated messages they have not unsubscribed properly)!


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

We are now sending and receiving messages successfully! This is a big milestone in the course - be sure to congratulate everyone.

The very last thing we should do is add a nice bit of user experience, by adding a placeholder in the chat input field. We've not used placeholders before, explain that they are just text to give instruction to the user about how to use the interface:

**pages/chat/chat.html**

```html
    <ion-input [(ngModel)]="line" placeholder="Say something to {{user.login}}" name="line" type="text">
```

## Next Lesson

Next time we're going to implement chat history

## Screenshots

### Initial Chat Page

![Initial Chat Page](https://github.com/lathonez/powwow/blob/lesson-five/lessons/screens/5-chat-after.PNG "Initial Chat Page")

### Chat Page

![Chat Page](https://github.com/lathonez/powwow/blob/lesson-five/lessons/screens/6-chat-after.PNG "Chat Page")
