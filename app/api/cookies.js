'use strict';
import {User} from '../db/schema';
import sha1 from 'sha1';
import _ from 'lodash';

function generateToken(userName, password) {
  return userName + ':' + sha1(password);
}

function validateToken(token, callback) {
  if (token === null || token === undefined || token.length === 0 || !token.includes(':')) {
    return callback(null, false);
  }
  const userName = getUsernameFromToken(token);
  findUser(userName, function (err, user) {
    if (err)  return callback(err);
    if (user) {
      const {userName, password} = user;
      callback(null, generateToken(userName, password) === token);
    }
  });
}

function getUsernameFromToken(token) {
  const index = _.lastIndexOf(token, ':');
  return token.substring(0, index);
}

function findUser(userName, callback) {
  User.findOne({userName}, function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
}

export {
  validateToken,
  getUsernameFromToken
};

