## Lesson Objectives

* [Working Registration](#working-registration)
* [Diff](https://github.com/lathonez/powwow-lessons/compare/lesson-three...lesson-four)

## Working Registration

* switch pages to register when register is clicked

**pages/login/login.ts**

```javascript
  register() {
    // switch to the register page
    this.nav.push(RegisterPage);
  }
```
* add a stub register function

**pages/register/register.ts**

```javascript
  register() {
    console.log('REGISTER');
  }
```

* add empty register form

**pages/register/register.html**

```html
<ion-content>
  <ion-list>
    <form (submit)="register()">

    </form>
  </ion-list>
</ion-content>
```

* add five template inputs and one button

**pages/register/register.html**

```html
      <!-- FIVE of these (the last is not required): -->
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

* Fill out the inputs (Label / ngModel / name / type):
⋅⋅* Name / name / name / text
..* Username / username / username / text
..* Password / password / password / password
..* Password (Confirm) / passwordConfirm / passwordConfirm / password
..* Email / email / email / email

* Add form variables:

**pages/register/register.ts**

```javascript
export class RegisterPage {

  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
```

* Block registration if passwords don't match

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

* add registration function to chat service

**services/chat.ts**

```javascript
  register(username, password, name, email) {

    // create registration options for our mandatory params
    let options: any = {
      login: username,
      password: password,
      full_name: name
    };

    // add email if provided
    if (email) {
      options.email = email;
    }

    // to create the session (we've no user yet), we just pass the username
    return self.quickBloxWrapper('createSession', {login: username})

      // after our session is created, we create (register) the user with the options above
      .then(result => self.quickBloxWrapper('users.create', options))

       // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
  }
```

* call registration function from register page

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

* feedback failure to user

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
