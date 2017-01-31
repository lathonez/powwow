## Lesson Objectives

* [Cloud 9 Intro / App Layout](#cloud-9-intro)

* [Run the project](#run-the-project)
* [Dev Tools Intro](#dev-tools-intro)
* [Typescript Basics](#typescript-basics)

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
* console.log (in console)
* console.log (in home page)

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