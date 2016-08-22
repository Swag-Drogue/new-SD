'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from '../spec/finish';
import db from '../app/db/db';
import async from 'async';

fdescribe('为空情况', () => {

  it('用户名或密码为空', (done) => {
    async.series([
      (cb) => request(app)
        .post('/api/sessions')
        .send({userName: '12', password: ''})
        .expect(400, cb, '用户名和密码不能为空'),
    ], finish(done));
  });
});

fdescribe('登录成功', () => {
  beforeEach((done) => {
    async.series([
      (cb) => db.connect('test', cb),
    ], finish(done));
  });
  it('登录成功', (done) => {
    async.series([
      (cb) => request(app)
        .post('/api/sessions')
        .send({userName: 'nike123456', password: '123456'})
        .expect(201, cb, '登录成功'),
    ], finish(done));
  });
});
fdescribe('用户名不存在',() =>{
  beforeEach((done) => {
    async.series([
      (cb) => db.connect('test', cb),
    ], finish(done));
  });
  it('用户名不存在', (done)=> {
    async.series([
      (cb) => request(app)
        .post('/api/sessions')
        .send({userName: '1245613215', password: '456465'})
        .expect(401, cb, '用户名不存在'),
    ], finish(done));
  });
  afterEach((done) => {

    db.close(finish(done));

  });

});


