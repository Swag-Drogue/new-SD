'use strict';
import express from 'express';
import {User} from '../db/schema';
import {isEmpty, validUserName, validPassword} from '../../shared/register-validation';

const router = express.Router();
router.post('/', function (req, res, next) {
  const {userName, password} = req.body;
  const userData = {userName, password};
  if (isEmpty(userData)) {
    return res.status(400)
      .send('用户名和密码不能为空');
  } else if (!validUserName(userData.userName)) {
    return res.status(400)
      .send('用户名只能是6-20位数字、字母组成');
  } else if (!validPassword(userData.password)) {
    return res.status(400)
      .send('密码只能是6位数字');
  } else {
    User.findOne({userName: userData.userName}, function (err, user) {
      if (err) return next(err);
      if (user !== null) {
        return res.status(409)
          .send('该用户已存在');

      }
      new User(userData).save((err)=> {
        if (err) return next(err);
        return res.status(201)
          .send('注册成功');
      });
    });
  }
});
export default router;
