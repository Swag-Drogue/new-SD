'use strict';
import express from 'express';
import {User} from '../db/schema';
import sha1 from 'sha1';
import _ from 'lodash';

const router = express();
router.get('/', function (req, res,next) {
  const token = req.cookies['token'];
  validateToken(token, function (err, hasToken) {
    if (err) return next(err);
    if (hasToken) {
      return res.sendStatus(201);
    }
    return res.sendStatus(401);
  });
});

function generateToken(userName, password) {
  return userName + ':' + sha1(password);
}
function validateToken(token, callback) {
  if (token === null || token.length === 0 || !token.includes(':')) {
    callback(null, false);
  }
  const userName = getUsernameFromToken(token);
  findUser(userName, function (err, user) {
    if (err)  console.log(err);
    if (user) {
      const {userName, password} = user;
      callback(null, generateToken(userName, password) === token);
    }
  });
}
function getUsernameFromToken(token) {
  const index = _.indexOf(token, ':');
  return token.substring(0, index);
}
function findUser(userName, callback) {
  User.findOne({userName}, function (err, user) {
    if (err) console.log(err);
    callback(null, user);
  });
}

export default router;

