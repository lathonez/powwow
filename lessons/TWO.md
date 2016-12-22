## Lesson Objectives

* [Working Login](#working-login)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-two...lesson-three)

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
    return self.quickBloxWrapper('createSession', {login: username, password: password})
      // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
```

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