"use strict";
import express from 'express';
import {User} from '../db/schema';
import {isEmpty, validSyntax} from '../../shared/register-validation';

const router = express.Router();
router.post('/', function (req, res, next) {
  const {userName, password} = req.body;
  const data = {userName, password};
  if (isEmpty(data)) {
    return res.status(400)
      .send('用户名和密码不能为空');
  } else if (!validSyntax(data)) {
    return res.status(400)
      .send('用户名只能是6-20位数字、字母组成，密码只能是6位数字');
  } else {
    User.findOne({userName: data.userName}, function (err, user) {
      if (err) return next(err);
      if (user === null) {
        new User(data).save((err)=> {
          if (err) return next(err);
          return res.status(201)
            .send('注册成功');
        });
      } else {
        return res.status(409)
          .send('该用户已存在');
      }
    });

  }
});


export default router;
