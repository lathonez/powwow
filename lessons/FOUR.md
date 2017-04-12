## Lesson Objectives

* [Contact List](#chat-list)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-four...lesson-five)
* [Screenshots](#screenshots)
* [Next Lesson](#next-lesson)

## New concepts being addressed

* Sessions
* UIDs
* Infinite Scroll
* Variable passthrough
* Map
* Filter
* NavParams
* Template looping (`ngFor`)
* Avatars
* Images

## Contact List

For the contacts list we need to combine a few different calls to our chat server:

* `createSession` - we already have this from our previous work on the login page
* `connect` - after we create a session, we need to connect to the server using it
* `users.get` - get all the users on the server

It's worthwhile to show the students the chat API's [documentation](https://quickblox.com/developers/Overview), so they can see how these fit together.

First off, we create a connect function, which takes a session and a password. The session is the output of the `createSession` call that we already have. Explain that a session represents ther user's current interaction with the chat server. This is a very general concept in web development. If the user doesn't perform any actions for a while (or they log out), their session will expire. Next time they login, they will get a totally new session. Sessions are usually represented by a unique id (UID).

Note here that we record the current user's ID (which we get from the session) - we'll need it later. The user's ID is another example of a unique ID (UID). The server generates an ID for each user when the register. Each ID is unique, the server uses these to reference different users, so it doesn't have to use their usernames (allowing the usernames to be changed).

**services/chat.ts**:

```javascript
  connect(session, password) {

    // store the current userId so we can use it to lookup who we are
    self.currentUserId = session.user_id;

    // connect to the server with this user
    return self.quickBloxWrapper('chat.connect', {userId: session.user_id, password: password});
  }
```

Now we're going to make a new function `getUsersFromServer`. This will get the users we'll display in our contacts list.

There are a few new concepts here.

**Infinite Scroll**:

Ask the students what they think the `per_page` option is for? 100 is the maximum number we're allowed to get from the server. If we have more than 100 users, we need to make multiple requests. Most apps use infinite scroll for this - the app detects that you are getting near the bottom, and loads in some more results from the server (e.g. loads the next page directly into the scroll list). Why can't we just load in all the users at the same time? Explain the performance implications of this!

**Mapping**:

We covered arrays in the intro, and have used them a couple of times since then when passing options around. Mapping is a way of taking an array and transforming it's value to something else. The easiest example is an array of `[1, 2, ,3, 4]` with a mapping function that applies `+1` to each element. You end up with `[2, 3, 4, 5]`. Here, we're using a map to simplify (or `flatten`) the data we get back from the server. This makes it easier for us to access it later.

From:

```json
users: [
  items: [
    {
      user: userOne,
    },
    {
      user: userTwo,
    }
    ,
    {
       user: userThree,
    }
  ]
]
```

to:

```json
users: [
  items: [userOne, userTwo, userThree]
]
```

**Variable Passthrough**

We're going to be using this function in an asynchronous promise chain (`.then .then .then`). It's much easier for us to write our chain if we can pass the results down. We take a variable `ret` into our function, and return it without modifying it at all. This is actual our login result and we need to pass it back to the `LoginPage`. The response from this request is the users that we've asked the server for. We store these against the class and use them later on in our `ContactsPage`..

**services/chat.ts**:

```javascript
  getUsersFromServer(ret) {

    // get _all_ the users!
    return self.quickBloxWrapper('users.get', {per_page: 100})

      // set our users array to the returned users from the server
      .then(users => {
        self.users = users.items.map(item => item.user);
        return ret;
      });
  }
```

We've created two functions so far, we need to add these into the `promise chain` in our login function. What will happen when we login is that we'll:

1. `create` a session with the server
2. `connect` to the server using that session
3. `get all the users` from thr server (we wouldn't be able to do this without an active session)

This is the most complex part of the course. Spend a lot of time on it, draw it out on the whiteboard. At the very least, the students should understand why we are making each call to the server, and the order that we are making them in.

We call this function from our login page, so now we've added these new functions into the chain, the users we need to display in our contacts list will be gathered as we login.

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

It's **very** important to ensure that login still works and does not error out!

We've already made a `getUsersFromServer` function - we're about to make another one `getUsers`. Why? Tell the students that we're going to `filter` our list of users. There is one user we don't want to display - who is it? `getUsersFromServer` gets **all** the users, including our user! We don't want to see ourselves in the chat list!

Explain that `filter` is like `map`, but instead of transforming the content of the array, we're removing some. Taking the same example as before `[1, 2 ,3 ,4]` with a filter of `!== 1` will give us `[2, 3, 4]`. So we're just filtering out our own user, and returning all the others.

**services/chat.ts**:

```javascript
  getUsers() {
    // show all the users (apart from the current logged in user)!
    return this.users.filter(user => user.id !== self.currentUserId);
  }
```

Our last bit of Javascript for the lesson is adding a function in our `ContactsPage` that will start a chat with whichever user we've clicked on.

We've pushed pages into our nav stack a couple of times now, but never with options before. By doing this `{user: user}`, we can pass a variable to the page we're changing to. When we change to our chat page, the user we want to chat with will be available to it as a variable via `NavParams`. We'll see this in more detail next lesson.

**pages/contacts/contacts.ts**:

```javascript
  startChat(user) {
    // open the chat page for the user we've clicked on
    this.nav.push(ChatPage, {user: user});
  }
```

Finally! We're ready to write our chat page HTML. As usual, draw out on the board what we're trying to achieve from our template.

There's a few things here we've not covered before:

* `ngFor`: What this does is repeat this tag, and everything underneath it. So this code is saying "For each user that is returned by my chat.getUsers() functions, display this template". This is the first time we've used any sort of loop, but students are well versed in it from scratch.
* `ion-avatar`: This a HTML tag that can be used to display a small image of a user
* `img`: used to display an image (inside the avatar). We will display an anonymous avatar for each user. If we expanded this app, we could load a profile picture for the user from the server, if they have one set.

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

## Next Lesson

Next time we're going to be working on the chat page

## Screenshots

### Initial Contacts Page

![Initial Contacts Page](https://github.com/lathonez/powwow/blob/lesson-four/lessons/screens/2-login-after.PNG "Initial Contacts Page")

### Contacts Page

![Contacts Page](https://github.com/lathonez/powwow/blob/lesson-four/lessons/screens/4-contacts-after.PNG "Contacts Page")
