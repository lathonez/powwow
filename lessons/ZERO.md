## Lesson Objectives

* [Cloud 9 Intro / App Layout](#cloud-9-intro)

* [Run the project](#run-the-project)
* [Dev Tools Intro](#dev-tools-intro)
* [Typescript Basics](#typescript-basics)

## Project Intro

* introduce other teachers
* has anyone coded before?
* what differences are there between scratch and coding (very similar, computers are stupid), lots of similar concepts as we will see
* this term working on a chat app using cutting edge professional development tools and technologies
* we will work together to make the app, you will get an insight to what it feels like to be a software developer
* don't worry if you don't understand something, this stuff is for professionals with years of training. no one expects you to get it first time, we will go slow and do everything together

To start off, we're going to introduce you to the workspace and get our app up and running.

## Cloud 9 Intro

* what is the cloud anyway?
* layout: file tree, file workspace (like scripts in scratch), runners (like green flag in scratch), DO NOT PUSH RUN AT THE TOP
* run the serve runner (press green flag..)
* preview in new tab (and close the preview workspace - not enough space to work comfortably)
* app is running YAY

## Dev Tools Intro

* open dev tools (via the menu)
* different workspaces
* device emulator
* inspect html
* app logs - what are logs for?

## Build Cycle Intro

* Add a log line into app.component.ts (what is this file?)
* SAVE `ctrl + s` or file > save (dot changes to cross)
* Watch app runner rebuild
* WAIT for green "build finished"
* REFRESH the preview tab with our app running it (observe log line added)

If I have changed something and it isn't working?!

(S)un (B)eats (R)ain:

* SAVE: are all my workspace tabs saved (no dots)
* BUILD: is the build runner finsihed building (green text - build complete)
* REFRESH: did I refresh my page (doesn't hurt to do it again!)

This is all the same as not clicking the green flag in scratch

## App Intro

* App is made of three main file types: HTML, SCSS and Typescript
* HTML: the template / building blocks for our content
* SCSS: design tweaks to make our template look nice
* Typescript: the "real" coding - provides content for our HTML / SCSS template, and provides functionality in the app (e.g. sending a message)

Comparisons:

* Scratch: Typescript is like the sprite scripts. HTML + SCSS are like the sprite costumes. Typescript fills our HTML & SCSS with content and provides it with functionality, as the sprite scripts in scratch make the sprite move around the screen.
* School Uniform: The type of uniform (shirt / jumper / trousers / skirt) is the HTML. The colour / style (blue / green / stripey) is the SCSS. The student inside the uniform running around the school is the Typescript

Go through the files:



## Ionic View

* Tell students to install Ionic View app on their device in time for next lesson and bring a device in next time (not essential)
* Install ionic view app from app store

## Typescript Basics

* **BINDING**: Add a result variable to login.ts, set it to something in the constructor and display it in the html

**pages/login/login.html**:

```html
<ion-content>{{result}}</ion-content>
```

**pages/login/login.ts**:

```javascript
  public result;

...

    this.result = 'TEST';
```

* **FUNCTIONS**: Set the result variable from a function in the constructor

**pages/login/login.ts**:

```javascript
  this.result = this.myFirstFunction();

...

  public myFirstFunction() {
    return 'FUNCTION RESULT';
  }
```

* **STRINGS**: pass a variable into the function affecting the result

**pages/login/login.ts**:

```javascript
  this.result = this.appendText('SOME TEXT');

...

  public appendText(input) {
    return 'FUNCTION RESULT ' + input;
  }
```

* **NUMBERS**: do some addition in the function

**pages/login/login.ts**:

```javascript
  this.result = this.addNumbers(6, 6);

...

  public addNumbers(numberOne, numberTwo) {
    return numberOne + numberTwo;
  }
```

* **ARRAYS**: play with array binding

**pages/login/login.ts**:

```javascript
    let myFirstArray = ['one', 'two', 'three'];
    myFirstArray.push('four');
    this.result = myFirstArray[0] + ' ' + myFirstArray[2] + ' ' + myFirstArray[3];
```

* **OBJECTS**

**pages/login/login.ts**:

```javascript
    this.car: any = {
      wheels: 4,
      doors: 2,
      fuel: 'petrol',
      transmission: 'manual',
      running: false
    };
    this.result = 'wheels: ' + car.wheels;
```

* **IF / LOGIC**:

**pages/login/login.ts**:

```javascript

    this.result = this.printCarRunning();

  public printCarRunning() {
    if (car.running) {
      return 'CAR IS RUNNING';
    } else {
      return 'CAR IS NOT RUNNING';
    }
  }
```

* **HTML** / bringing it all together:

**pages/login/login.html**:

```html
<ion-content>
  <ion-list>
    <ion-item>
      <button ion-button block type="button" (click)="toggleCarRunning()">
        Toggle Car Running
      </button>
    </ion-item>
  </ion-list>
  {{printCarRunning()}}
</ion-content>
```

**pages/login/login.ts**:

```javascript
  public toggleCarRunning() {
    if (this.car.running) {
      this.car.running = false;
    } else {
      this.car.running = true;
    }
  }
```