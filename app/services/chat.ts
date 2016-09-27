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

  quickBloxWrapper(func, options): Promise<any> {

    let self = this;

    return new Promise(function(resolve, reject) {

      let cb = function(error, result) {
        if (error) {
          return reject(error);
        } else {
          return resolve(result);
        }
      };

      self.QB[func](options, cb);
    });
  }

  login(username, password) {
    return this.quickBloxWrapper('createSession', {login: username, password: password})
      .then((result) => this.quickBloxWrapper('connect', {userId: result.userId, password: password }))
      .catch(this.errorHandler);
  }

  errorHandler(error) {

    let message;

    switch (error.code) {
      case 0:
        message = 'No internet connection';
        break;
      case 401:
        message = 'Invalid username / password';
        break;
      default:
        message = `There was an error logging in CODE: ${error.code} - ${error.message}`;
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