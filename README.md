# PowWow

Ionic 2 chat app using QuickBlox with lesson plans (below)

## Lessons

* [Intro](https://github.com/lathonez/powwow/blob/lesson-one/lessons/ZERO.md)
* [Lesson One - Requirements Capture + Login](https://github.com/lathonez/powwow/blob/lesson-one/lessons/ONE.md)
* [Lesson Two - Login (continued)](https://github.com/lathonez/powwow/blob/lesson-two/lessons/TWO.md)
* [Lesson Three - Registration](https://github.com/lathonez/powwow/blob/lesson-three/lessons/THREE.md)
* [Lesson Four - Contacts Page](https://github.com/lathonez/powwow/blob/lesson-four/lessons/FOUR.md)
* [Lesson Five - Chat (send)](https://github.com/lathonez/powwow/blob/lesson-five/lessons/FIVE.md)
* [Lesson Six - Chat (receive)](https://github.com/lathonez/powwow/blob/lesson-six/lessons/SIX.md)
* [Lesson Seven - Chat (history)](https://github.com/lathonez/powwow/blob/lesson-seven/lessons/SEVEN.md)
* [Lesson Eight - Theming](https://github.com/lathonez/powwow/blob/lesson-eight/lessons/EIGHT.md)

## Cloud 9 Workspace Setup
* create new workspace using the following options: (private | github clone URL https://github.com/lathonez/powwow.git | node JS template)
* Run the setup script (`./c9/setup-workspace.sh`)
* Add the serve runner into the bottom tab (new Run Configuration with the options:  "Serve" "npm start")
* Add the upload runner into the bottom tab (new Run Configuration with the options: "Upload" "ionic upload")
* Modify `ionic.config.json` to contain the Student's App Name and App ID (from creating an app on Ionic View)
* Add `powwow/src` to favourites (file tree)
* Remove workspace files (file tree)
* Hide unused workspace tabs (commands, navigate, collaborate, outline, debugger)
* Test app runner
* Test upload runner

## Branches

All lessons are on their own branch.

This means that if a student misses a session, you can run `git checkout lesson-<whatever>`, in Cloud9's terminal.

E.g, if you are teaching lesson six, and the student missed lesson five, you can run `git checkout lesson-six` to give them the same code as everyone else.

## Accounts

The following accounts are required for the course:

* Cloud9: Every student will be supplied with a cloud9 account. You need to run the above `Cloud 9 Workspace Setup` for each of them.
* Ionic View: Code4Fun have an account for Ionic View - this lets the students view the apps on their phones. Grig has the details for this account. The students need to download the app on their phones and login with our account to view their app
* QuickBlox: A free account is required for QuickBlox. The [credentials here](https://github.com/lathonez/powwow/blob/master/src/services/chat.ts#L12-L16) are from my account. You can either substitute your own or email me if you need access to my account (you shouldn't do)

