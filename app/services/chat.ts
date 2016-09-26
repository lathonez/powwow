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

  login(username, password, callback) {

    let cb = function(error, result) {

      if (error) {
        return callback(error);
      }

      this.connect(result.user_id, password, cb);
    };

    this.QB.createSession({login: username, password: password}, cb);
  }

  connect(userId, password, callback) {

    let cb = function(error, result) {

      if (error) {
        return callback(error);
      }

      console.log(result);
      callback(null, result);
    };

    this.QB.chat.connect({userId: userId, password: password}, cb);
  }
}
