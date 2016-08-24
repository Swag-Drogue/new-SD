'use strict';
import express from 'express';
import {Articles} from '../db/schema';

const router = express.Router();

router.post('/', function (req, res) {
  const {title, paragraph, images} = req.body;
  const articleData = {title, paragraph, images};

  new Articles(articleData).save((err)=> {
    if (err) return res.status(401).send('error');
    return res.status(201).send('写入成功');
  });
});

export default router;
