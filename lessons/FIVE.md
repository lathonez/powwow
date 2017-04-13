## Lesson Objectives

* [Send Chat](#send-chat)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-five...lesson-six)
* [Screenshots](#screenshots)
* [Next Lesson](#next-lesson)

## New concepts being addressed

* NavParams (continued)
* Template Variables
* ion-scroll
* False checking
* Returning early
* Scoping

## Send Chat

We covered passing the `NavParams` through in our last lesson. The first thing we're going to do here is to store the user we passed through as a `class variable`, so we can access it from the HTML.

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

Now we've stored the user against the class, we can access the name in the HTML and replace those annoying `??` question marks! The double curly syntax is a way of accessing variables in the class and printing them directly in the HTML. We covered this in the intro lesson but not since.

**pages/chat/chat.html**:

```html
    <ion-title>Chat with {{user.full_name}}</ion-title>
```

Let's write out chat page's HTML. Draw out on the whiteboard what we're trying to achieve.

* `ion-scroll`: A scrollable text area - we'll be using this to display our conversation. Ask the students what `scrollY` does (horizontal scroll) - they should figure it out from scratch.

We've covered everything else in previous lessons. We're going to have a class variable called `line`, which will store the current line we're typing.

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

Let's create our Javascript function for sending messages. Currently it's not going to do anything apart from print the message out to our developer console.

We add the `line` variable mentioned previously, and then a `sendMessage` function.

Notice that we return early here if `!self.line`. We've covered before that `!` means "not". So this is like saying, "If we don't have a line, then return early". This is a quick and easy way of making sure we don't try to send a blank line to the server.

The other interesting thing about our `sendMessage` function is that we re-assign the `self.line` class variable to a local `message` function variable. We've talked about these concepts a few times now but this is a very good example of the difference. We clear the `self.line` class variable because we want to clear the input for the user - but we also need to keep track of it to send to the server, so we store it in a function variable before we clear it. The HTML does **not** have access to the `message` variable, it is only available within the `scope` of our `sendMessage` function.

**pages/chat/chat.ts**:

```javascript
  // who we're chatting to
  user = null;

  // current line of text we're typing
  line;

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

We're now ready to send messages to our server. To do this we'll need to add a function in our `ChatService` which can send messages.

There are some interesting options here:

* `type`: What other types of message could we have (video, photo, audio)
* `body`: This is the content of the message
* `save_to_history`: If we send this as 0, the server wont store our messages in it's chat history, which we'll want for our chat history lesson later! `0` or `1` is the same as saying `true` or `false`.
* `senderId`: This is how the chat server knows who the message has come from - our current user
* `markable`: Allows our messages to be marked as read. e.g. it'll be possible for us to know when our recipient has read the message (those two ticks in WhatsApp)

We then pass all those options along with the `recipientId` to our chat server.

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

Finally, let's send the message from our `ChatPage`. Note that we send it using the class variable `self.user.id`, which is the UID of the user we're chatting to.

**pages/chat/chat.ts**:

```javascript
    // clear the input for the user to type something new
    self.line = '';

    // send the message (fire and forget!)
    self.chat.send(message, self.user.id);
```

## Next Lesson

Next time we're going to be finish the chat page - we'll be receiving messages

## Screenshots

### Initial Chat Page

![Initial Chat Page](https://github.com/lathonez/powwow/blob/lesson-five/lessons/screens/5-chat-before.PNG "Initial Chat Page")

### Chat Page

![Chat Page](https://github.com/lathonez/powwow/blob/lesson-five/lessons/screens/5-chat-after.PNG "Chat Page")
