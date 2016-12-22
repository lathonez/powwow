## Lesson Objectives

* [Requirements Capture](#requirements-capture)
* [Add login page (non functioning)](#add-login-page)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-one...lesson-two)

## Requirements Capture

* registration
* login
* list users
* basic chat
* message delivery status (failed, delivered, read)
* chat history
* chat with multiple users (by switching pages)
* online / offline
* remember me
* is typing..
* group chat
* emojis
* profile photo
* video chat

## Modify login page

* add login form:

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

* add login functions:

**pages/login/login.ts**:

```javascript
export class LoginPage {

  username: string;
  password: string;

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
