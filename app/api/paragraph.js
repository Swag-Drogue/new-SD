'use strict';
import express from 'express';
import {Article} from '../db/schema';

const router = express.Router();

router.post('/', function (req, res) {
  const {author, title, paragraph, images} = req.body;
  const articleData = {author, title, paragraph, images};
  new Article(articleData).save((err)=> {
    if (err) return res.status(500).send('error');
    return res.status(201).send('写入成功');
  });
});

export default router;
