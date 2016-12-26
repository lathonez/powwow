## Lesson Objectives

* [Contact List](#chat-list)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-four...lesson-five)

## Contact List

* Add connect function:

**services/chat.ts**:

```javascript
  connect(session, password) {

    // store the current userId so we can use it to lookup who we are
    self.currentUserId = session.user_id;

    // connect to the server with this user
    return self.quickBloxWrapper('chat.connect', {userId: session.user_id, password: password});
  }
```

* Add getUsersFromServer function:

**services/chat.ts**:

```javascript
  getUsersFromServer(ret) {

    // get _all_ the users!
    return self.quickBloxWrapper('users.get', [{per_page: 100}])

      // set our users array to the returned users from the server
      .then(users => {
        self.users = users.items.map(item => item.user);
        return ret;
      });
  }
```

* Add connect and getUsersFromServer into login function:

**services/chat.ts**:

```javascript
    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('createSession', {login: username, password: password})

      // open a connection with this user
      .then(result => self.connect(result, password))

      // get the users associated with the account
      .then(self.getUsersFromServer)

      // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
```

* Test login still works (doesn't error)..

* Add get users function:

**services/chat.ts**:

```javascript
  getUsers() {
    // show all the users (apart from the current logged in user)!
    return this.users.filter(user => user.id !== self.currentUserId);
  }
```

* Add start chat function:

**pages/contacts/contacts.ts**:

  startChat(user) {
    // open the chat page for the user we've clicked on
    this.nav.push(ChatPage, {user: user});
  }

* Add html to display contacts list:

**pages/contacts/contacts.html**:

```html
  <ion-list>
    <ion-item *ngFor="let user of chat.getUsers()" (click)="startChat(user)">
      <ion-avatar item-left>
        <img src="assets/images/anonymous_avatar.jpg">
      </ion-avatar>
      <h2>{{user.login}}</h2>
    </ion-item>
  </ion-list>
```

* Add padding class to content:

```html
<ion-content padding>
```