"use strict";
import express from 'express';
import _ from 'lodash';
import {User} from '../db/schema';

const router = express.Router();
router.post('/', function (req, res, next) {
  const data = req.body;
  if (_.isEmpty(data)) {
    res.json({
      httpCode: 400,
      message: '用户名和密码不能为空'
    })
  } else {
    new User(data).save((err)=> {
      if (err) return next(err);
      res.json({
        httpCode: 201,
        message: '注册成功'
      });
    });
  }
});

export default router;
