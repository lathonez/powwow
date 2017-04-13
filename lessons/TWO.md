## Lesson Objectives

* [Working Login](#working-login)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-two...lesson-three)
* [Screenshots](#screenshots)
* [Next Lesson](#next-lesson)

## New concepts being addressed

* service classes / code separation
* quickBloxWrapper
* Passing options as an object
* Asynchronous code
* using the quickBloxWrapper
* Loading spinner
* Alert box
* Error Handling
* Switch / case statements
* Changing pages / navigation stack

## Working Login

We have our login page template (html) good to go, but so far nothing is working. The username and password are logged out in the developer console, but nothing happens yet.

The first thing we need to do is put a login function into our `ChatService.ts` file. Take a moment to explain why we're doing this. Why can't we just put the function in our `LoginPage.ts` file? After all - it will only be used on login.

It is because we want to separate concerns - it is good programming practice! Our `ChatService.ts` file is for anything to do with talking to our chat server, we'll be using it a lot in the coming weeks - Login is just the beginning.

If we had all the logic spread across the various pages, it would be difficult to refactor (clean up!), or to reason about how different parts of the chat server interaction work.

Introduce the students to the `quickBloxWrapper` code, you will have gone over it in the intro lesson but it might make more sense now we are actually using it. For now, it is sufficient to explain that the QuickBlox library (the Javascript code that the QuickBlox team has given us to use with their server) is using some old standards when it comes to Asynchronous programming - we'll cover more on this later. Any time we want to talk to the server, we will use this QuickBlox wrapper function.

Finally, explain the different parts of the call:

* `createSession` - this is the request we're going to make to the server
* `Options Object` - we pass an object containing our login and password to the server. We covered the object data structure in the intro, but this is the first time we're using it in anger. Explain the alternative (passing separate parameters), and explain that because different requests take all kinds of different parameters, it is more convenient for the server to just ask for one parameter (the options!)

**services/chat.ts**:

```javascript
  login(username, password) {

    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('createSession', {login: username, password: password});
  }
```

Now we have the `login` function in our `ChatService.ts`, we need to call it from our `LoginPage.ts` function. It is always good to draw these out on the board, with arrows going from the page, to the service, to the server, and back.

First off, we just ask the server to log us in, and store the result in a `variable` called `loginResult`. Although the students wont see it yet, this is the first example of Asynchronous code we've done.

Explain the concept of Promises. They work just like in real life:

* `this.chat.login` returns a promise. This means that it is doing something asynchronously, but it promises that it will come back and tell us about what happened!
* the `.then` chains are waiting for the `promise` to be `fulfilled`. When we get a response from the chat server, the code after the `.then` will be called.
* it is a fun exercise to put in some `console.log` lines through the function, and see which will get printed first. Ask the students to guess before you test it:

The below function will print out "1, 2, (the login result) 3" - even though 2 is obviously the last thing to happen in the function. This is because the log line for `2` doesn't have a `then` in front of it - it isn't waiting for login `promise` to come back. So the `2` will be printed at the same time as we are communicating with the chat server.

**pages/login/login.ts**:

```javascript
  login() {

    console.log(1);

    let loginResult: any = {};

    this.chat.login(this.username, this.password)

      // store the result from login so we can access it later
      .then((result) => loginResult = result)
      .then(() => console.log(result))
      .then(() => console.log(3));

    console.log(2);
}
```

Now we have started to look at Asynchronous code, we need to think about what happens to our users. How will they know that the page is loading, how will we present them a message if their login has failed?

To do this we add some utilities to our `Utils.ts`. This class is a service, just the same as our `Chat.ts`, but it is concerned about utility functions, e.g, miscellaneous things that multiple pages will use.

We will add an alerter function, and a loading spinner function. Take time to explain to the students that while computer is displaying the loading spinner to the users, it is doing two things at once - one is displaying the loading spinner, another is communicating with the server.

Who can guess what we will use the alert for?

We add three functions below:

* `showLoadingSpinner` - this takes a message (to be displayed along with the spinner), and will create a loading spinner on the page
* `hideLoadingSpinner` - using a reference created when we call `showLoadingSpinner`, we use this function to hide the loading spinner
* `alerter` - this takes a title (for the alert window), a message (for the alert body) and text to display on a button. Notice that the button text is an Array. We covered Array's in the intro, but can anyone guess why we might be passing a one item array as options for the button text (we can possibly have multiple buttons on our alert)

**services/utils.ts**:

```javascript
  showLoadingSpinner(message) {
    this.loadingSpinner = this.loading.create({
      content: message
    });
    return this.loadingSpinner.present();
  }

  hideLoadingSpinner() {
    return this.loadingSpinner.dismiss();
  }

  alerter(title, message, buttonText) {
    let alert = this.alert.create({
      title: title,
      subTitle: message,
      buttons: [buttonText]
    });
    alert.present();
  }
```

Now we've added those utilities, we can use them directly in our `LoginPage.ts`. Ask the students when they think we should show and hide the loading spinner?

**pages/login/login.ts**:

```javascript
    let loginResult: any = {};

    // show the loading spinner as we might have to wait a while to login
    this.utils.showLoadingSpinner('Logging in...');

    this.chat.login(this.username, this.password)

      // store the result from login so we can access it later
      .then((result) => loginResult = result)

      // hide our loading spinner as we can no hand back to the user
      .then(() => this.utils.hideLoadingSpinner())
```

When might we get an error from our login page?

* Internet connection fails
* Incorrect username / password
* Server has an error

When `quickBloxWrapper` receives an error from the server, it will `reject` it's `promise`, instead of `fulfilling` it. The code made a contract, promising to get back to us with the result of the request - but rejecting the promise is a valid action. It let's us know something has gone wrong.

We have a pre-built error handler in `ChatService.ts`, called `errorHandler` Go over the code with the students, it uses a `switch` statement which they haven't seen before. Explain that it's just like a bunch of `if then` statements, you could write it out on the board as if statemenmts to explain.

The error handler looks for error codes it knows about from the chat server, and returns a message that is user friendly.

Just as we used `.them` chains to wait for our `promise` to `fulfil` previously, we can use `.catch` chains to handle an error, if we are expecting that our promise might `reject`. Below, we catch any error inside the `login` function, and return a user friendly error message to the calling code.

**services/chat.ts**:

```javascript
    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('createSession', {login: username, password: password})
      // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
```

Finally, we need to process the login result. If the `loginResult` contains an `error` key, we know we've received an error from the server (see the `Promise.resolve` code in the `errorHandler`).

So here we a use a simple `if else` statement, many of the students will be familiar with this from scratch, plus it's covered in the intro.

* IF we receive an error, then show it to the user in the form of an alert message.
* ELSE push `ContanctsPage` onto our nav stack.

**pages/login/login.ts**:

```javascript
      // hide our loading spinner as we can now hand back to the user
      .then(() => this.utils.hideLoadingSpinner())

      // process the result
      .then(() => {
        if (loginResult.error) {
          // =[ login failed!
          this.utils.alerter('Login Failure!', loginResult.error.message, 'OK');
        } else {
          this.nav.push(ContactsPage);
          // successful login, yay!
          console.log('login successful');
        }
      });
```

## Nav Stack

This is a good time to explain how a stack works. We push a page onto the stack, and pop it off the top of the stack to move backwards (handled by the framework when we click the back button or swipe back - we don't need to code this). The stack keeps track of what pages we've navigated to in the app so far.

The stack is really easy to demonstrate using anything that can be stacked up (post-its)!

## Next Lesson

Next time we're going to make a start on our user registration page.

## Screenshots

### Loading Spinner

![Loading Spinner](https://github.com/lathonez/powwow/blob/lesson-two/lessons/screens/2-login-spinner.PNG "Loading Spinner")

### Alert Box

![Alert Box](https://github.com/lathonez/powwow/blob/lesson-two/lessons/screens/2-login-alert.PNG "Alert Box")

### Contacts Page

![Contacts Page](https://github.com/lathonez/powwow/blob/lesson-two/lessons/screens/2-login-after.PNG "Contacs Page")
