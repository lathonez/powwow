# powwow
ionic 2 chat app

# powwow

# Lesson One

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

* add [form](https://github.com/lathonez/powwow/blob/lesson-two/src/pages/login/login.html#L7-L39) to `login.html`
* add [`username`, `password` and `login` / `register`](https://github.com/lathonez/powwow/blob/lesson-two/src/pages/login/login.ts#L22-L30) functions - just with log lines to `login.ts`

# Lesson Two

## Lesson Objectives

* [Working Login](#working-login)
* [Diff](https://github.com/lathonez/powwow-lessons/compare/v1.0...v2.0)

## Working Login

* create a basic login function in ChatService, and join the dots to test:

**services/chat.ts**:

```javascript
  login(username, password) {

    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('main', 'createSession', {login: username, password: password});
  }
```

**pages/login/login.ts**:

```javascript
  login() {

    let loginResult: any = {};

    this.chat.login(this.username, this.password)

      // store the result from login so we can access it later
      .then((result) => loginResult = result)
      .then(() => console.log(result))
}
```

* add `alerter` and `loadingSpinner` to utils service, plumb loading spinner into login

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

* process login result

**services/chat.ts**:

```javascript
    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('main', 'createSession', {login: username, password: password})
      // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
```

**pages/login/login.ts**:

```javascript
      // hide our loading spinner as we can no hand back to the user
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