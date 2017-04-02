## Lesson Objectives

* [Custom Colours](#custom-colours)
* [Overriding SCSS variables](#overriding-scss-variables)
* [Changing the Favicon](#changing-the-favicon)
* [Changing Button Directives](#changing-button-directives)
* [Diff](https://github.com/lathonez/powwow/compare/lesson-eight...lesson-nine)

## New Concepts Being Addressed

* SCSS Variables
* Hex Colours
* Favicon
* PNG files vs JPEG files
* Browser Caching
* Button style directives - (we have seen these before when adding buttons, but not manipulated them yet)

## Custom Colours

We can change the colours throughout our application by changing a few SCSS variables in our `theme/variables.scss`. Explain to students that SCSS variables are CSS variables that are dynamically applied to all CSS when the application is built. So instead of havinig to set these colours for hundreds of different styles, we only need to set them once - we can override them in other places if necessary.

Direct the students to an online [hex colour picker](https://www.w3schools.com/colors/colors_picker.asp). Explain that hex colours are a way for the computer to understand exactly what colour you want (e.g saying 'Light Blue' isn't very specific for a computer!).

Ask the students to pick a primary and a secondary colour for their app, and replace those in variables.scss below. Explain that we're not using the Danger, Light or Dark in the app at the moment, but that the students can set these if required.

[BrandColours is a great resource for inspiration!](https://brandcolors.net/)

**theme/variables.scss:**

```css
$colors: (
  primary:    #387ef5,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222
);
```

## Overriding SCSS variables

Show the students [Ionic's SCSS variables list page](https://ionicframework.com/docs/theming/overriding-ionic-variables/) - we can override any of these variables in our `variables/theme.scss` file. Say we want to change the background colour for the app, we can use the `$background-color` variable.

**theme/variables.scss:**

```css
$background-color: #dcf8c6;
```

Challenge the students to change the colour of the nav bar in the same way:

```css
$toolbar-background: #075e54;
```

## Changing the Favicon

Explain that a favicon is a tiny picture that we can use to identify a website. The name comes from "Favourite Icon" - as this is the icon that goes next to a website in your favourites. We can see our app's favicon is the ionic logo in our tab. This lives in `app/assets/icon/favicon.ico`. Open this file in the cloud9 editor so we can see it.

Ask the students to search for a **square** icon they'd like to use. `PNG` files need to be use because they have the concept of transparency - we want the space around the icon to be the same colour as the browser's tab, not a solid background. Once they have a `PNG` file, they should use [this website](http://image.online-convert.com/convert-to-ico) to convert it to an `.ico`. They should use 16x16 pixels for their conversion size - this is the standard size of a favicon. Ask them why they shouldn't make it any larger (wasted bandwidth / takes a long time to load).

After they have the resulting `.ico` file, the students need to upload it to cloud9 using `file > upload local files`. They should save the file over the favicon that's already there. Open the updated file in the cloud9 editor to make sure it's as we expect.

Favicons are heavily cached by the browser. Explain that browser caching is the browser keeping old copies of static data (images are the best example), so they don't have to reload it. Favicons are cached more than most other things, as they rarely change. To get Chrome to reload the favicon, we right click on the refresh button and click `empty cache + hard reload`. If this doesn't work the first time, it should the second!

## Changing Button Directives

Our buttons in `pages/login/login.html` look like this:

```html
    <button ion-button icon-left block type="button" (click)="register()">
      <ion-icon name="add-circle"></ion-icon>
      Register
    </button>
```

The `block` bit is actually a directive to tell the button how to draw itself. Conceptually this is very similar to CSS. Ask the students to open the [ionic button docs](https://ionicframework.com/docs/components/#buttons).

Here we can see live examples of the buttons and the assicoiated code. Ask the student to change the buttons in their login page to a different style. Note how we can use the colour variables from our `variables.scss` explicitly here.

**pages/login/login.html:**

(we've added outline to give our block buttons an outline only look):

```html
 <!-- invoke our register function explicitly when this button is clicked -->
  <ion-col>
    <button ion-button icon-left block outline type="button" (click)="register()">
      <ion-icon name="add-circle"></ion-icon>
      Register
    </button>
  </ion-col>
  <!-- button type of submit will submit the form -->
  <ion-col>
    <button ion-button icon-left block outline>
      <ion-icon name="log-in"></ion-icon>
      Login
    </button>
  </ion-col>
```

The students now have the skills they need to spend some of their own time customising the app!

## Before Theme Applied (Ionic Standard)

![Before Theme Applied](https://github.com/lathonez/powwow/blob/lesson-eight/lessons/screens/8-theme-before.png "Before Theme Applied")


## After Theme Applied (WhatsApp!)

![After Theme Applied](https://github.com/lathonez/powwow/blob/lesson-eight/lessons/screens/8-theme-after.png "After Theme Applied")

