import { Injectable } from '@angular/core';

let chat: ChatService;

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
  currentUserId = [];

  // all the users in the world
  users = [];

  constructor() {
    // qb initialiser - does nothing with network
    this.QB.init(this.auth.id, this.auth.key, this.auth.secret, this.config);
    chat = this;
  }

  init() {
  }

  quickBloxWrapper(api, func, options?): Promise<any> {

    return new Promise(function(resolve, reject) {

      let cb = function(error, result) {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      };

      if (api === 'main') {
        chat.QB[func](options, cb);
      } else {
        chat.QB[api][func](options, cb);
      }
    });
  }

  getUsers() {
    // show all the users (apart from the current logged in user)!
    return this.users.filter((user) => user.id !== chat.currentUserId);
  }

  getUsersFromServer(ret) {

    // get _all_ the users!
    return chat.quickBloxWrapper('users', 'get', {per_page: 100})

      // set our users array to the returned users from the server
      .then((users) => chat.users = users.items.map((item) => item.user));
  }

  connect(session, password) {

    // store the current userId so we can use it to lookup who we are
    chat.currentUserId = session.user_id;

    // connect to the server with this user
    return chat.quickBloxWrapper('chat', 'connect', {userId: session.user_id, password: password});
  }

  login(username, password) {

    // first we need to create a session with quickBlox for this user (first step auth)
    return chat.quickBloxWrapper('main', 'createSession', {login: username, password: password})

      // open a connection with this user
      .then((result) => chat.connect(result, password))

      // get the users associated with the account
      .then(chat.getUsersFromServer)

      // catch any errors and format them nicely for the user
      .catch(chat.errorHandler);
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
    return chat.quickBloxWrapper('main', 'createSession', {login: username})
      .then(((result) => chat.quickBloxWrapper('users', 'create', options)))
      .catch(chat.errorHandler);
  }

  errorHandler(error) {

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
