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
    self = this;
    // qb initialiser - does nothing with network
    self.QB.init(self.auth.id, self.auth.key, self.auth.secret, self.config);
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


  login(username, password) {

    // first we need to create a session with quickBlox for this user (first step auth)
    return self.quickBloxWrapper('main', 'createSession', {login: username, password: password})
      // catch any errors and format them nicely for the user
      .catch(self.errorHandler);
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
