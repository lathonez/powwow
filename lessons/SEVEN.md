## Lesson Objectives

* [Chat History](#chat-history)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-seven...lesson-eight)
* [Screenshots](#screenshots)
* [Next Lesson](#next-lesson)

## New concepts being addressed

* `null`
* find (instead of filter)
* includes
* reverse
* forEach
* ternary operator

## Chat History

The chat service (quickblox) uses the concept of "dialogs" for chat history. A dialog is a chat between one of more users.

The first step in displaying our chat history, is to ask the chat server for the `dialog list` between our user and whoever we are chatting with. As you will see below, what we actually do here is ask for all of the dialog lists for our user, and then filter to find those for the specific user we are chatting with.

By now, the students will recognise that the `.then` means an `asynchronous` request. So we ask the chat server for all the dialogs, wait for it to respond to us, and then filter the results. We've covered these concepts previously, but this time we are using `find` instead of `filter`. The reason we are doing this is that `find` only returns a single result, whereas filter returns an array (though it may only contain one result, it is more convenient for us to have a single item outside of the array). We're passing `null` into the quickBlox wrapper - this is simply because we have no options to send, `null` is the same as saying "nothing" or "none".

We're also using a function called `includes` for the first time, which will return true of the array of `occupants_ids` contains the `user_id` that we're chatting with.

**services/chat.ts**:

```javascript
  getDialog(user_id) {
    // lookup a dialog id from a user_id
    // get all dialogs
    return self.quickBloxWrapper('chat.dialog.list', null)
      .then(dialogs => dialogs.items.find(dialog => dialog.occupants_ids.includes(user_id)))
  }
  ```

The next step is to take the dialog, and ask the server for a list of the messages that correspond to it, and log them out:

1. Get the dialog between our user and the user we are chatting with
2. Get the chat list for our dialog
3. Log our chat list out to the developer console

Note the options we are passing here. We're asking the server to sort the chat messages for us, giving us the most recent first. This isn't actually the order we want to display the messages in - we want the oldest at the top, newest at the bottom. However, if we ask the server for the messages in that order, and there are over 100, we will not get the most recent messages! To put it simply, we are asking for the last 100 messages in the history. If we wanted more, we'd need to do `infinite scroll` as we discussed when creating the `ContactsPage`. We're also asking for 100, which is the most we can ask for in one go (we've seen this before with our contacts list!). Finally we're asking for the specific dialog UID that we retrieved above.

**services/chat.ts**:

```javascript
  history(user) {

    let options: any = {sort_desc: 'date_sent', limit: 100, skip: 0};
    // first we need to get the dialog ID for this user
    return self.getDialog(user.id)
      .then(dialog => {
        options.chat_dialog_id = dialog._id;
        return self.quickBloxWrapper('chat.message.list', options);
      })
      .then((dialog) => console.log(dialog));
  }
```

At this point, we have a means of getting our chat history, but it wont look very good in our conversation window. This function is doing very similar work to our send and receive functions in `ChatPage`, in terms of formatting, with a few key differneces.

We want to avoid having to put the date in front of every chat message we display, but now we're showing history, our messages could be several days old. Some of the main chat applications out there (WhatsApp) add a break in the history each time the date changes, to let the user know. Other than that, they just show the time.

We'll break this down line by line:

1. Declare a function variable `history` which is an array exactly the same conceptually as our conversation array in `ChatPage`. It will keep many lines of conversation
2. Declare another variable to keep track of what the last day we've seen is.
3. Order all of our `dialog.items` (history lines) in reverse, to get the oldest first
4. Loop over the history lines. Everything under `forEach` will be repeated for each line of history
5. Declare a `day` variable, to tell us what day this line of history is for. This and the next two are using `momentjs`, which we've used before in our `ChatPage`
6. Declare a `time` variable, to tell us what time this line of history is for
7. Declare a `message` variable, to store the actual message that was sent
8. Declare a `who` variable, which will either be "me" if the current user sent the message, or the name of the user that we're chatting to if not. This is the first time the students have seen a ternary operator. Write it out on the whiteboard using a normal `if` statement so they can see how it works. Explain that it is just convenient shorthand.
9. If we've come onto a new day (e.g. if the current history message's day is different to the last day we saw), push a separate line into the history which is **only** got the day in it, this is how we break the days apart.
10. If we did (9), set the `lastDay` to the `day`
11. Push the actual chat line to the history array, along with the time it was sent and who sent it. This is using string concatenation, which we covered in our `ChatPage` lessons
12. Once the loop has finished, return the history

This is the single most complex bit of Javascript we've done in the course, so spend a good while on it until everyone understands what it is doing. This is a great example of a simple looping algorithm!

**services/chat.ts**:

```javascript
  formatHistory(dialog, user) {

    let history = [];
    let lastDay = '';

    dialog.items.reverse().forEach(item => {

      let day = moment(item.created_at).format('MMMM Do');
      let time = moment(item.created_at).format('h:mm:ss a');
      let message = item.message;
      let who = user.id === item.recipient_id ? 'me' : user.login;

      // we want to add each day break as a separate line in our conversation
      // this will mean there's more space for chat and less for showing the date!
      if (day !== lastDay) {
        history.push(day);
        lastDay = day;
      }

      history.push(time + ' - ' + who + ' : ' + message);
    });

    return history;
  }
```

Now we have a our `formatHistory` function, we can hook it into our history `promise chain`, so it is ready to be used in our `ChatPage`. 

**services/chat.ts**:

```javascript
      .then(dialog => {
        options.chat_dialog_id = dialog._id;
        return self.quickBloxWrapper('chat.message.list', options);
      })
      // replace console.log with self.formatHistory
      .then((dialog) => self.formatHistory(dialog, user));
```

Finally, when we open our `ChatPage`, we should fetch the history and set our conversation array to contain it

**pages/chat.ts**:

```javscript:
    // the user that we're chatting to is passed through in the NavParams, store it
    self.user = navParams.data.user;

    self.chat.history(self.user)
      .then(history => this.conversation = history);
```

## Next Lesson

Next time we're going to add our own styles / themes to the app

## Screenshots

### Chat Page Before History

![Chat Page Before History](https://github.com/lathonez/powwow/blob/lesson-six/lessons/screens/6-chat-after.PNG "Chat Page Before History")

### Chat Page After History

![Chat Page After History](https://github.com/lathonez/powwow/blob/lesson-seven/lessons/screens/7-history-after.PNG "Chat Page After History")
