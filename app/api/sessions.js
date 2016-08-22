'use strict';
import express from 'express';
import {User} from '../db/schema';
import {isEmpty} from '../../shared/register-validation';

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
      return res.status(201).send('登录成功');
    });
  }
});

export default router;
