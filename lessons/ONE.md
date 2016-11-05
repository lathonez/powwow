## Lesson Objectives

* [Sublime Intro / App Layout](#sublime-intro)
* [Command line Intro](#command-line-intro)
* [Run the project](#run-the-project)
* [Dev Tools Intro](#dev-tools-intro)
* [Upload project](#upload-the-project)
* [Requirements Capture](#requirements-capture)
* [Add login page (non functioning)](#add-login-page)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-one...lesson-two)

## Sublime Intro

* workspaces
* app layout (boilerplate, app.ts, theme, home page)
* red underlines

## Command Line Intro

* just need basic navigation
* show some commands / cool stuff but we wont be using anything

## Run the project

* `ionic serve`
* change some text on home page (observe auto-refresh)
* kill the server (observe server being dead)
* show an error compiling

## Dev Tools Intro

* open dev tools
* different workspaces
* device emulator
* inspect html
* console.log (in console)
* console.log (in home page)

## Upload project

* change app name (if using our account) to `powwow-[initials]`
* `ionic upload`
* download on device

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
