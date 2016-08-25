/*eslint no-console: "off"*/
import db from '../app/db/db';
import async from 'async';
import {User, Article} from '../app/db/schema';
import articles from './data/articles.json';
import user from './data/user.json';

async.series([
  (cb) => db.connect('users', cb),
  (cb) => {
    console.log('connected');
    cb();
  },
  (cb) => User.find().remove(cb),
  (cb) => {
    console.log('users deleted');
    cb();
  },
  (cb) => Article.find().remove(cb),
  (cb) => {
    console.log('articles deleted');
    cb();
  },
  (cb) => User.create(user, cb),
  (cb) => {
    console.log('users created');
    cb();
  },
  (cb) => Article.create(articles, cb),
  (cb) => {
    console.log('articles created');
    cb();
  },
  (cb) => db.close(cb)
], ()=> {
  console.log('Complete!');
});
