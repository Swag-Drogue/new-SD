"use strict";
import express from 'express';
import {User} from '../db/schema';
import {isEmpty, validSyntax} from '../../shared/register';

const router = express.Router();
router.post('/', function (req, res, next) {
  const data = req.body;
  if (!isEmpty(data)) {
    res.status(400)
      .json({
        httpCode: 400,
        message: '用户名和密码不能为空'
      });
  } else if (!validSyntax(data)) {
    res.status(400)
      .json({
        httpCode: 400,
        message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'
      });
  } else {
    User.findOne({userName: data.userName}, function (err, user) {
      if (err) throw err;
      if (user === null) {
        new User(data).save((err)=> {
          if (err) return next(err);
          res.status(201)
            .json({
              httpCode: 201,
              message: '注册成功'
            });
        });
      } else if (user.userName === data.userName) {
        res.status(409)
          .json({
            httpCode: 409,
            message: '该用户已存在'
          });
      }
    });

  }
});


export default router;
