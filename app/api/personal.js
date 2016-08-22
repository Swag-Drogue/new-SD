'use strict';
import express from 'express';
import {User} from '../db/schema';
import sha1 from 'sha1';
import _ from 'lodash';

const router = express();
router.get('/', function (req, res) {
  const info = req.cookies['info'];
  validateInfo(info, function (err, hasToken) {
    if (err) return next(err);
    if (hasToken) {
      return res.sendStatus(201);
    }
    return res.sendStatus(401);
  })
});

function generateInfo(userName, password) {
  return userName + ':' + sha1(password);
}
function validateInfo(info, callback) {
  if (info === null || info.length === 0 || !info.includes(':')) {
    callback(null, false);
  }
  const userName = getUsernameFromInfo(info);
  findUser(userName, function (err, user) {
    if (err) return next(err);
    if (user) {
      const {userName, password}=user;
      callback(null, generateInfo(userName, password) === info);
    }
  });
}
function getUsernameFromInfo(info) {
  const index = _.indexOf(info, ':');
  return info.substring(0, index);
}
function findUser(userName, callback) {
  User.findOne({userName}, function (err, user) {
    if (err) return next(err);
    callback(null, user);
  })
}

export default router;

