## Lesson Objectives

* [Requirements Capture](#requirements-capture)
* [Add login form](#add-login-form)
* [Add login javascript functions](#add-login-javascript-functions)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-one...lesson-two)

## New concepts being addressed

* Gathering Requirements / Planning a software project
* HTML Forms
* Ionic lists
* Ionic items
* Ionic flex (rows / columns)
* Form Inputs (username / password)
* Form Buttons
* Icons
* Class level variables (scoping)
* Console (for logging)
* Javascript functions

## Requirements Capture

Explain the process of requirements capture - it's what would happen at the start of any project. You could even do a "sprint" board with postit notes that you could move around each week.

Ask the students to think of any chat app that they know and shout out some of the features. QuickBlox has an advanced API and supports any feature that exists in a current chat app. If we were to extend this course we could fulfill all of the requirements!

Be careful to explain why some requirement might not be appropriate (e.g. camera functions - even if we were going to send picture messages we would use the phone's camera software to take photos - not write our own).

We should also try to break features down into their smallest parts - sending picture messages can be broken down like this:
* start a normal chat with a user
* take a photo with the phone's camera software
* send pictures to the server
* receive pictures from the server)
* display pictures appropriately in the chat window

Here are a bunch of example requirements:
* registration
* login
* list users
* basic chat
* message delivery status (failed, delivered, read)
* chat history
* chat with multiple users (by switching pages)
* notifications
* online / offline
* remember me
* is typing..
* group chat
* emojis
* profile photo
* video chat

Explain the structure of a development team in a software company. There, the students would be assigned some tasks each (possibly in pairs). e.g one pair work on Login and another work on Registration, another on Chat. So they each are responsible for their own areas. Explain why we are all working together as a class on the same thing for education purposes.

## Add login form

It's very important to draw the login form we are making out on the whiteboard before we make the HTML. That way when we are writing the HTML we can refer back to it for reference.

* `<ion-list>` -  simply a way of keeping the different components of the login form away from each other.
* `<form>` - the form will call a login() function (which we haven't written yet) when it is submitted. Explain what forms are used for (capturing information) on the internet, and what it means to submit a form
* `<ion-item>` - these are simply things that live inside our list
* `<ion-label>` - to instruct the user what is supposed to go inside the input. The label sits on the left of the input.
* `<ion-input>` - to capture the input from the user. Explain what the difference is between `type="text"` / `type="password"` (and any others you like)
* `[(ngModel)]` - matches our form input directly to a variable in Javascript so we can work with it easily there. Explain that each time the form is updated, the Javascript variable will be updated (and vice-versa!). We haven't made the variables yet.
* `name` - we need to name our inputs so that the variable linking (previous point) works correctly
* `required` - explain what a required input is. For login, both username and password are required. Our form will not be valid (and will not submit) unless input is enterred into both of these fields. Give some examples of when we would not have a required field (e.g. phone number when registering could be optional)
* `<ion-row>`/`<ion-col>` - this is using flexbox to fill the available space with the structure. We have one row with two columns on it - this is to make the register and login buttons sit nicely next to each other
* `<button>` - the difference between `type="button"` and nothing (default) is that the default behaviour submits the form. We know the form will submit and call a `login()` function, as covered above, but we want the register button to do something else - when it is clicked it should call the `register()` function - we haven't written this yet!
* `ion-button icon-left block` - these are directives that influence how the button looks. Show the students the [documentation page](https://ionicframework.com/docs/v2/components/#buttons) with all the examples
* `<ion-icon>` - an icon to help the user identify what the button does. Show the students the icon [documentation](http://ionicons.com/cheatsheet.html) and they can pick their own icons
* Explain that the `Login` and `Register` are actually plain text that lives in the buttons. The students could write anything they like here and the button will display it - it is the button content.

**pages/login/login.html**:

```html
  <ion-list>
    <form (submit)="login()">
      <ion-item>
        <ion-label floating>Username</ion-label>
        <ion-input [(ngModel)]="username" name="username" type="text" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-label floating>Password</ion-label>
        <ion-input [(ngModel)]="password" name="password" type="password" required></ion-input>
      </ion-item>

      <ion-item>
        <ion-row>
          <!-- invoke our register function explicitly when this button is clicked -->
          <ion-col>
          	<button ion-button icon-left block type="button" (click)="register()">
          		<ion-icon name="add-circle"></ion-icon>
          		Register
          	</button>
          </ion-col>
          <!-- button type of submit will submit the form -->
          <ion-col>
          	<button ion-button icon-left block>
          		<ion-icon name="log-in"></ion-icon>
              Login
            </button>
          </ion-col>
        </ion-row>
      </ion-item>
    </form>
  </ion-list>
```

Test our code - there will be some errors in the console if we click the buttons, because we haven't made the functions yet. However the basic template should look OK!

## Add login javascript functions

**pages/login/login.ts**:

* First thing we need to do is create those variables to tie into the `ngModel` form inputs. These are class level variables, which means we don't need to put `var` or `let` or `const` when declaring them. However it means that they are in the scope of the class, not the individual functions. Try to explain scoping to the students. The functions cannot see anything in the class scope without putting `this` in front of it. Show them what it would look like in the function scope (e.g. `var username;` and `console.log(username)`). Explain that because it is in the scope of the class, and it is the current class (THIS) class - we will need to use `this` to get to it. The reason we need to put it in the class scope is so our html can access it (`ngModel`)
* Next we have a couple of very simple functions, they just log out the contents of the `username` and `password` variables in our developer console. The register function just says `REGISTER`. Explain the purpose of this for testing our code.
* Ask the students if this is secure or not? Can anyone see the passwords being logged out to the console apart from us (they cannot, it's perfectly fine). Turn the projector off and ask one of the students how he can possibly see the password.

```javascript
export class LoginPage {

  username;
  password;

  ...

  login() {
    console.log('LOGIN');
    console.log('USERNAME: ' + this.username);
    console.log('PASSWORD: ' + this.password);
  }

  register() {
    console.log('REGISTER');
  }
```

Test the code - there should be no more errors now, and we should have the `username` and `password` variables printed out in the console log.

## Next Lesson

The next lesson is finishing the login form so we can login to the server and see it's response. If we get a successful login we will switch to our contacts list. If we fail to login, we will show the error nicely to the user. What should we do while we are waiting for the server to respond to us (loading spinner!)
