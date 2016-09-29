import { EventEmitter, Injectable } from '@angular/core';

let self: ChatService;

@Injectable()

export class ChatService {

  QB = require('quickblox');

  auth = {
    id: 47347,
    key: 'rz2uCEkfpH6XEKR',
    secret: 'DTtjahrzr55Xqup',
  };

  config = {
    chatProtocol: {
      active: 2
    },
    debug: {
      mode: 1,
      file: null
    }
  };

  // our current user
  currentUserId;

  // all the users in the world
  users = [];

  // event emitters for events received from the chat service
  messageEmitter: EventEmitter<{}> = new EventEmitter();

  constructor() {
    // qb initialiser - does nothing with network
    this.QB.init(this.auth.id, this.auth.key, this.auth.secret, this.config);
    self = this;
  }

  quickBloxWrapper(api, func, options): Promise<any> {

    // wrap any QuickBlox async function (taking a callback) to return a promise
    return new Promise(function(resolve, reject) {

      // pass this callback through to the quickBlox function
      let cb = function(error, result) {

        if (error) {
          // reject the promise (causing an error), if we recieve an error
          return reject(error);
        } else {
          // resolve the promise if there's no error
          return resolve(result);
        }
      };

      // some QuickBlox functions have no namespace (createSession)
      // but most are prefixed by the API section (chat.send, users.get)
      if (api === 'main') {
        // invoke the QuickBlox function, with the options passed in, and our callback above
        self.QB[func](options, cb);
      } else {
        // ditto ^^, but for the provided namespace
        self.QB[api][func](options, cb);
      }

      // when our callback is executed by QuickBlox, our promise will be resolved or rejected accordingly
    });
  }

  getUsers() {
    // show all the users (apart from the current logged in user)!
    return this.users.filter((user) => user.id !== self.currentUserId);
  }

  getUsersFromServer(ret) {

    // get _all_ the users!
    return self.quickBloxWrapper('users', 'get', [{per_page: 100}])

      // set our users array to the returned users from the server
      .then((users) => self.users = users.items.map((item) => item.user));
  }

  connect(session, password) {

    // store the current userId so we can use it to lookup who we are
    self.currentUserId = session.user_id;

    // setup event listeners
    self.setupListeners();

    // connect to the server with this user
    return self.quickBloxWrapper('chat', 'connect', {userId: session.user_id, password: password});
  }

  login(username, password) {

    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('main', 'createSession', {login: username, password: password})

      // open a connection with this user
      .then((result) => self.connect(result, password))

      // get the users associated with the account
      .then(self.getUsersFromServer)

      // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
  }

  register(username, password, name, email) {

    // create registration options for our mandatory params
    let options: any = {
      login: username,
      password: password,
      full_name: name
    };

    // add email if provided
    if (email) {
      options.email = email;
    }

    // to create the session (we've no user yet), we just pass the username
    return self.quickBloxWrapper('main', 'createSession', {login: username})

      // after our session is created, we create (register) the user with the options above
      .then(((result) => self.quickBloxWrapper('users', 'create', options)))

       // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
  }

  send(message, recipientId) {
    let msg = {
      type: 'chat',
      body: message,
      extension: {
        save_to_history: 1,
      },
      senderId: self.currentUserId,
      markable: 1
    };

    // message sending is fire and forget in QuickBlox (no async callback)
    return self.QB.chat.send(recipientId, msg);
  }

  setupListeners() {
    // set up observables so we can receive inbound events (messages!) from the server

    // message observable
    self.QB.chat.onMessageListener = function(userId, message) {

      // when we receive a message, our observable should emit the data
      self.messageEmitter.emit({userId: userId, message: message});
    };
  }


  errorHandler(error) {
    // helper function to format error messages received from the server nicely for the user
    let message;

    switch (error.code) {
      case 0:
        message = 'No internet connection';
        break;
      case 401:
        message = 'Failed to authenticate';
        break;
      case 422:
        message = require('prettyjson').renderString(error.detail);
        break;
      default:
        message = `An error has occurred: ${error.code} - ${error.message}`;
    }

    // we use the this function in a catch block in a promise chain
    // we need to return a promise containing the error to pass it up to the calling code
    return Promise.resolve(
      {
        error: {
          raw: error,
          message: message
        }
      }
    );
  }
}
