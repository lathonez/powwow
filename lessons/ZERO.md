## Lesson Objectives

* [Project Intro](#project-intro)
* [Cloud 9 Intro](#cloud-9-intro)
* [Dev Tools Intro](#dev-tools-intro)
* [Build Cycle Intro](#build-cycle-intro)
* [App Layout](#app-layout)
* [Coding intro](#coding-intro)

## Project Intro

* introduce other teachers
* has anyone coded before?
* what differences are there between scratch and coding (very similar, computers are stupid)
* this term working on a chat app using cutting edge professional development tools and technologies
* we will work together to make the app, you will get an insight to what it feels like to be a software developer
* don't worry if you don't understand something, this stuff is for professionals with years of training. no one expects you to get it first time, we will go slow and do everything together

## Cloud 9 Intro

* what is the cloud anyway? What's a server? What's a client?
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

* Web app vs a real app
* App is made of three main file types: HTML, SCSS and Typescript
* HTML: the template / building blocks for our content
* SCSS: design tweaks to make our template look nice
* Typescript: the "real" coding - provides content for our HTML / SCSS template, and provides functionality in the app (e.g. sending a chat)

Comparisons:

* Scratch: Typescript is like the sprite scripts. HTML + SCSS are like the sprite costumes. Typescript fills our HTML & SCSS with content and provides it with functionality, as the sprite scripts in scratch make the sprite move around the screen.
* School Uniform: The type of uniform (shirt / jumper / trousers / skirt) is the HTML. The colour / style (blue / green / stripey) is the SCSS. The student inside the uniform running around the school is the Typescript

**Boilerplate**:

Anyone know what boilerplate means?

Boilerplate is a term web developers have started using over the last few years. What it basically means is a whole bunch of code that we have to use to make our apps work, but we don't usually change it very much.

No need to worry too much about these files, this is just for background info.

* index.html: just loads a whole bunch of typescript and librarires, main.ts is the entry point to our app.
* declarations.d.ts: define TYPES for our typescript - more on types later
* manfiest.json: config file for our framework
* service-worker.js: library - allows the app to work offline
* app: main entry point for our app
* app.component.ts: simple component to contain our app
* app.module.ts: declares all the COMPONENTS and SERVICES in our app
* app.scss: empty SCSS file for global app level
* main.ts: entry point to our app
* assets: in here are some images (favicon and an avatar icon). Who knows what we use these for?
* strophe.js / jquery.min.js: old school web libraries
* theme/variables.scss: SCSS variable definitions

The files we will work on are in the pages and services folder.

* Pages: each page in our app has a folder.
* Services: services are for Typescript code used by multiple pages.

## Coding Intro

Each of our pages has Typescript, HTML and SCSS

**Open login.html:**

* Out in 1993, markup language (format text)
* Explain tags
* Header
* `<ion-content></ion-content>`
* Who can update content? between tags and SBR
* Who can make a new line?
* Whitespace and indentation.
* Who knows any HTML tags?
* Add a button:

**pages/login/login.html**:

```html
<ion-content>
  <button ion-button>My Button</button>
</ion-content>
```

Add some Typescript to make our button do something!

**Open login.ts:**

* Who can name some programming languages?
* Javascript? With Types
* What are types?
* Why typescript / javascript?
* Explain imports
* Public vs Private
* Constructor
* This
* funtion

**pages/login/login.ts**:

```javascript
  public counter = 0;
  ...
  public plus() {
    this.counter = this.counter + 1;
  }
```

* Now what happens?
* Make the button click the counter:

**pages/login/login.html**:

```html
  <button ion-button (click)="plus()">
```

* Still nothing..
* Add some log lines, observe in the console:

**pages/login/login.ts**:

```javascript
  public plus() {
    console.log('counter before ' + this.counter);
    this.counter = this.counter + 1;
    console.log('counter after ' + this.counter);
  }
```

**pages/login/login.html**:

```html
  <button ion-button (click)="plus()">{{counter}}
```

Add some SCSS to make our page look cool

**Open login.scss**

* Find an image you want and get the URL.
* Add the URL as a CSS rule

**pages/login/login.scss**:

```css
.login {
  background: url('http://tinyurl.com/op6aznv');
}
```

* nothing happened..
* Add a class to the page content

**pages/login/login.html**:

```html
  <ion-content class="login">
```

* How does it look?
* Add more rules to make it look good

**pages/login/login.scss**:

```css
  background-size: contain;
  background-repeat: no-repeat;
```

## What have we covered?

* How to use C9 cloud workspace
* How to use Chrome developer tools to emulate a mobile device and inspect / debug a webpage
* Sun Beats Rain
* The structure of a webapp
* The basics of coding HTML, Typescript and SCSS

## Ionic View

* Tell students to install Ionic View app on their device in time for next lesson and bring a device in next time (not essential)
* Install ionic view app from app store
* Download your version of powwow