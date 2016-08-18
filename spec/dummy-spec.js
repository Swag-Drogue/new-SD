'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from '../spec/finish';
import db from '../app/db/db';
import {User} from '../app/db/schema';
import async from 'async';

describe('test',() => {
  describe('test true', () => {
    beforeEach((done) => {
      async.series([
        (cb) => db.connect('test', cb),
        (cb) => User.find().remove(cb)
      ], finish(done));
    });

    it('true', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike1996', password: '123456'})
          .expect(201, cb,'注册成功'),
      ], finish(done));
    });
  });

  describe('unit count', () => {
    it('username number false', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike', password: '123456'})
          .expect(400, cb,'用户名只能是6-20位数字、字母组成'),
      ], finish(done));

    });

    it('password number false', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike1996', password: '12345'})
          .expect(400, cb,'密码只能是6位数字'),
      ], finish(done));
    });

    it('username and password number false', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike', password: '12345'})
          .expect(400, cb,'用户名只能是6-20位数字、字母组成'),
      ], finish(done));
    });
  });

  describe('unit string number', () => {
    it('not recognized username', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike_+', password: '123456'})
          .expect(400, cb,'用户名只能是6-20位数字、字母组成'),
      ], finish(done));
    });

    it('not recognized password', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike1996', password: '1234_+'})
          .expect(400, cb,'密码只能是6位数字'),
      ], finish(done));
    });

    it('not recognized username and password', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike_+', password: '123456'})
          .expect(400, cb,'用户名只能是6-20位数字、字母组成'),
      ], finish(done));
    });
  });

  describe('unit undefined', () => {

    it('empty username', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: '', password: '123456'})
          .expect(400, cb,'用户名和密码不能为空'),
      ], finish(done));

    });

    it('empty password', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike0000', password: ''})
          .expect(400, cb,'用户名和密码不能为空'),
      ], finish(done));

    });

    it('empty username and password', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: '', password: ''})
          .expect(400, cb,'用户名和密码不能为空'),
      ], finish(done));
    });
  });

  describe('test already exist', () => {
    it('username is exist', (done) => {
      async.series([
        (cb) => request(app)
          .post('/api/users')
          .send({userName: 'nike1996', password: '123456'})
          .expect(409, cb,'该用户已存在'),
      ], finish(done));

    });
    afterEach((done) => {
      db.close(finish(done));
    });
  });
});
