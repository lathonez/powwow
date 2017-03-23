## Lesson Objectives

* [Chat History](#chat-history)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-seven...lesson-eight)

## Chat History

* First step in getting our chat history is to ask the server for chat dialogs. Add a function to get the dialogs from the server.

**services/chat.ts**:

```javascript
  getDialog(user_id) {
    // lookup a dialog id from a user_id
    // get all dialogs
    return self.quickBloxWrapper('chat.dialog.list', null)
      .then(dialogs => dialogs.items.find(dialog => dialog.occupants_ids.includes(user_id)))
  }
  ```

* We can then query the server for the chat history of a the dialog we receive above, and log it out

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

* We need to be able to format our chat history nicely for the user, we can't just format it as it's received from the server. The purpose of the following is to mimick the formatting we do when we add to the conversation array in ChatPage

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

* Hook the formatHistory function into the history one we created earlier:

**services/chat.ts**:

```javascript
      .then(dialog => {
        options.chat_dialog_id = dialog._id;
        return self.quickBloxWrapper('chat.message.list', options);
      })
      // replace console.log with self.formatHistory
      .then((dialog) => self.formatHistory(dialog, user));
```

* We are now ready to set our conversation from the chat history when we initialise the ChatPage:

**pages/chat.ts**:

```javscript:
    // the user that we're chatting to is passed through in the NavParams, store it
    self.user = navParams.data.user;

    self.chat.history(self.user)
      .then(history => this.conversation = history);
```
