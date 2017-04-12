## Lesson Objectives

* [Working Registration](#working-registration)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-three...lesson-four)
* [Screenshots](#screenshots)
* [Next Lesson](#next-lesson)

## New concepts being addressed

This lesson is very similar conceptually to the login page, serving to reinforce what we've covered in the first two sessions.

* Duplicating code
* Client side validation vs Server side validation
* Not equal operator

## Working Registration

The first thing we need to do is switch to the registration page when the user clicks 'Register' in our `LoginPage.ts`. To do this we push the `RegisterPage` onto our navication stack. We did this last time, switching to `ContactsPage` on successful login.

**pages/login/login.ts**

```javascript
  register() {
    // switch to the register page
    this.nav.push(RegisterPage);
  }
```

Now we can switch into our register page, we should add an empty function that will be called when the user tries to register. At the moment, this function simply logs the word 'REGISTER' to our developer console. We will work more on this later in the session.

**pages/register/register.ts**

```javascript
  register() {
    console.log('REGISTER');
  }
```

Next, we can add an empty form to our HTML page. This is conceptually the same as our login form - it's purpose is to capture data from the user. At the moment, it doesn't do anything - but we've hooked in our empty `register` function that will be invoked when the form is submitted.

Before we start writing our HTML, draw the layout of the page on the whiteboard.

**pages/register/register.html**

```html
<ion-content>
  <ion-list>
    <form (submit)="register()">

    </form>
  </ion-list>
</ion-content>
```

The register form is much bigger than our login form, there are five inputs instead of two - this is going to be a lot of HTML. To make our lives easier, we can write one input out as a template, and `duplicate` it using `copy` and `paste`. The students should be familiar with this concept from scratch - the advantage is that if we are careful to write the code correctly once, we can be sure it will work the other times.

**pages/register/register.html**

```html
      <!-- FIVE of these: -->
      <ion-item>
        <ion-label floating>SETME</ion-label>
        <ion-input [(ngModel)]="setme" name="setme" type="setme" required></ion-input>
      </ion-item>

      <!-- ONE of these: -->
      <ion-item>
        <ion-col>
          <button ion-button icon-right block>
            <ion-icon name="add-circle"></ion-icon>Register
          </button>
        </ion-col>
      </ion-item>
```

We've duplicated our inputs: we have five of them. Now we need to replace all of the `setme` words with the correct ones for those inputs.

The following are what should be entered for each input. We've covered what each of these do in the `LoginPage`. As we're doing a bit of independent work here it is probably worth going over agian:

* Label: What will be shown to the user
* Variable Name: The Javascript variable that this input will be bound to
* Name: The name of the input (used by the framework as a reference)
* Type: The HTML input type

Each input should be filled out as follows (label | variable name | name | type):

* Name | name | name | text
* Username | username | username | text
* Password | password | password | password
* Password (Confirm) | passwordConfirm | passwordConfirm | password
* Email | email | email | email

Now we have our HTML set up as we need it, we need to add those javascript variables (that are bound to the form variables in the HTML). We've covered this before, but remind the students that we don't need to declare the variables (e.g. using `let`) as they are class variables. If we were doing this inside a function, we'd need the `let`:

```javascript
export class RegisterPage {

  username;
  password;
  passwordConfirm;
  name;
  email;
```

Ask the students if we should do anything with the input before we give it to the server? This is a good time to discuss client side vs server side validation:

* Client Side Validation: make sure all the inputs are filled out correctly
* Servier Side Validation: make sure the username has not already been taken.

In practice, all input should be validated on the server - we generally don't trust client applications to validate input correctly. If we validate it on the server we can be 100% sure it will always be correct.

So what's the point of validating anything on the client? It means that we don't need to make a request to the server to find out it's wrong, which is much quicker for the user and also results in less calls to the server, which is better for the performance of our application.

In our example, we're going to make sure the passwords the user has entered match each other. The students should have experienced this before - it is a way of making sure that the user has entered their password correctly, as they are unable to see it through the password input.

We've covered everything here before (`if` statement, `alerter`), but the students may not remember the `!==` not equal operator from the intro.

**pages/register/register.ts**

```javascript
  register() {

    let registerResult: any = {};

    if (this.password !== this.passwordConfirm) {
      this.utils.alerter('Password mismatch!', 'The two passwords you have supplied do not match', 'OK');
      this.password = '';
      this.passwordConfirm = '';
      return;
    }
```

We're about ready to submit our registration form to the server. For this we'll want to add a register function to our `ChatService`. Reinforce the services concept we covered last week here. Now we will have the `login` and `register`, functions - both of which talk to our chat server, in the same place.

To register with the server, we create a session, then use that session to create a user. We'll use the same `errorHandler` function that we used in our login page to catch any errors from the server. Remind the students that these are using `promises` so everything with a `.then` before it, is happening `asynchronously`.

**services/chat.ts**

```javascript
  register(username, password, name, email) {

    // create registration options for our mandatory params
    let options: any = {
      login: username,
      password: password,
      full_name: name,
      email: email
    };

    // to create the session (we've no user yet), we just pass the username
    return self.quickBloxWrapper('createSession', {login: username})

      // after our session is created, we create (register) the user with the options above
      .then(result => self.quickBloxWrapper('users.create', options))

       // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
  }
```

Now we can call the function we've just written, to create an account on the chat server, from our register page. As this is happening `asynchronously`, we'll need to use our loading spinner. For now, we just store the registration result, we don't do anything with it yet.

**pages/register/register.ts**

```javascript

    // show the loading spinner as we might have to wait a while to login
    this.utils.showLoadingSpinner('Registering...');

    // start the login sequence
    this.chat.register(this.username, this.password, this.name, this.email)

      // store the result from login so we can access it later
      .then((result) => registerResult = result)

      // hide our loading spinner as we can no hand back to the user
      .then(() => this.utils.hideLoadingSpinner())
```

Finally, we'll feedback failure to the user as an alert message (same as we did in login), and if successful, we'll pop the `RegisterPage` off the nav stack. We covered this concept last time, but here it is in action. We want the user to go back to the login page. Instead of pushing `LoginPage` onto the nav stack, we `pop` it off the top. This will mean that the user cannot go back from login to registration, which is what we want here.

**pages/register/register.ts**

```javascript
      // process the result
      .then(() => {

        if (registerResult.error) {
          // =[ login failed!
          this.utils.alerter('Registration Failure!', registerResult.error.message, 'OK');
        } else {
          // successful register, yay! - lets go back to login so the user can login
          this.nav.pop();
        }
      });
```

## Next Lesson

Next time we're going to be working on the contact list

## Screenshots

### Initial Register Page

![Initial Reg Page](https://github.com/lathonez/powwow/blob/lesson-three/lessons/screens/3-register-spinner.PNG "Initial Reg Page")

### Loading Spinner

![Loading Spinner](https://github.com/lathonez/powwow/blob/lesson-three/lessons/screens/3-register-spinner.PNG "Loading Spinner")

### Alert Box

![Alert Box](https://github.com/lathonez/powwow/blob/lesson-three/lessons/screens/3-register-alert.PNG "Alert Box")

### Register Page

![Register Page](https://github.com/lathonez/powwow/blob/lesson-three/lessons/screens/3-register-after.PNG "Register Page")
