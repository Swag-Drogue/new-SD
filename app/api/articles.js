'use strict';
import express from 'express';
import {Article} from '../db/schema';

const router = express.Router();

router.post('/', function (req, res, next) {
  const {author, title, article, images} = req.body;
  const articleData = {author, title, article, images};

  new Article(articleData).save((err)=> {
    if (err) return res.status(500).send('error');
    Article.findOne(articleData, function (err, article) {
      if (err) return next(err);
      return res.status(201).send(article._id);
    });
  });
});

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    return res.status(200).send(articles);
  });
});

router.get('/:id', function (req, res, next) {
  const articleId = req.params.id.substring(1);
  Article.findOne({_id: articleId}, function (err, article) {
    if (err) return next(err);
    return res.status(200).json(article);
  });
});

export default router;
