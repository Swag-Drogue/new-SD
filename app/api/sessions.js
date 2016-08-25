'use strict';
import express from 'express';
import {User} from '../db/schema';
import {isEmpty} from '../../shared/register-validation';
import {validateToken, getUsernameFromToken} from './cookies';
import sha1 from 'sha1';

const router = express.Router();
router.post('/', function (req, res, next) {
  const {userName, password} = req.body;
  const userData = {userName, password};
  if (isEmpty(userData)) {
    res.status(400).send('用户名或密码不能为空');
  } else {
    User.findOne({userName}, function (err, user) {
      if (err) return next(err);
      if (user === null) {
        return res.status(401).send('用户名不存在');
      }
      if (user.password !== userData.password) {
        return res.status(401).send('密码错误');
      }
      res.cookie('token', generateToken(userData.userName, userData.password), {
        expires: new Date(Date.now() + 900000)
      });
      return res.status(201).send('登录成功');
    });
  }
});

router.get('/current', function (req, res, next) {
  const token = req.cookies['token'];
  validateToken(token, function (err, validToken) {
    if (err) return next(err);
    if (validToken) {
      const userName = getUsernameFromToken(token);
      return res.status(201).send(userName);
    }
    return res.sendStatus(403);
  });
});

router.delete('/', function (req, res) {
  res.cookie('token','').sendStatus(200);
});

function generateToken(userName, password) {
  return userName + ':' + sha1(password);
}

export default router;
