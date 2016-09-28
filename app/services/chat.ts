import { Injectable } from '@angular/core';

@Injectable()

export class ChatService {

  QB = require('quickblox');

  auth = {
    id: 47347,
    key: 'rz2uCEkfpH6XEKR',
    secret: 'DTtjahrzr55Xqup',
  };

  user = {};

  config = {
    chatProtocol: {
      active: 2
    },
    debug: {
      mode: 1,
      file: null
    }
  };

  constructor() {
    // qb initialiser - does nothing with network
    this.QB.init(this.auth.id, this.auth.key, this.auth.secret, this.config);
  }

  init() {
  }

  quickBloxWrapper(api, func, options?): Promise<any> {

    let self = this;

    return new Promise(function(resolve, reject) {

      let cb = function(error, result) {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      };

      if (api === 'main') {
        self.QB[func](options, cb);
      } else {
        self.QB[api][func](options, cb);
      }
    });
  }

  login(username, password) {
    return this.quickBloxWrapper('main', 'createSession', {login: username, password: password})
      .then((result) => this.quickBloxWrapper('chat', 'connect', {userId: result.user_id, password: password}))
      .catch(this.errorHandler);
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
    return this.quickBloxWrapper('main', 'createSession', {login: username})
      .then(((result) => this.quickBloxWrapper('users', 'create', options)))
      .catch(this.errorHandler);
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
