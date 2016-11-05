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