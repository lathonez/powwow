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
* [Diff](https://github.com/lathonez/powwow-lessons/compare/v0.1...v1.0)

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

* add [form](https://github.com/lathonez/powwow-lessons/blob/d1dc54c825bc97cbe65532492c95a21d44288ebb/app/pages/login/login.html#L17-L38) to `login.html`
* add [`username`, `password` and `login` / `register`](https://github.com/lathonez/powwow-lessons/blob/d1dc54c825bc97cbe65532492c95a21d44288ebb/app/pages/login/login.ts#L15-L30) functions - just with log lines to `login.ts`

# Lesson Two

## Lesson Objectives

* [Working Login](#working-login)
* [Diff](https://github.com/lathonez/powwow-lessons/compare/v1.0...v2.0)

## Working Login

* create a skeleton `services/chat.ts` file and import it to login [b16bbae](https://github.com/lathonez/powwow-lessons/commit/b16bbae)
* import and initialise `QuickBlox` [537cddb](https://github.com/lathonez/powwow-lessons/commit/537cddb)
* create the `QuickBloxWrapper`, a basic login function, and join the dots to test [f0c1880](https://github.com/lathonez/powwow-lessons/commit/f0c1880)
* add `errorHandler` [2fafa75](https://github.com/lathonez/powwow-lessons/commit/2fafa75)
* create a skeleton `services/utils.ts` file and import it to login [ddd7880](https://github.com/lathonez/powwow-lessons/commit/ddd7880)
* add `alerter` and `loadingSpinner` to utils service, plumb loading spinner into login [01a162c](https://github.com/lathonez/powwow-lessons/commit/01a162c)
* process login result [7c5c934](https://github.com/lathonez/powwow-lessons/commit/7c5c934)