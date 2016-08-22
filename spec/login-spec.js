'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from '../spec/finish';
import db from '../app/db/db';

describe('测试', () => {
  beforeEach((done) => {
    db.connect('test',finish(done));
  });
  afterEach((done) => {
    db.close(finish(done));
  });
  describe('测试为真', () => {
    it('登录成功', (done) => {
      request(app)
        .post('/api/sessions')
        .send({userName: 'nike1996', password: '123456'})
        .expect(201, '登录成功', finish(done));
    });
  });
  describe('不能成功登录', () => {
    it('密码为空', (done) => {
      request(app)
        .post('/api/sessions')
        .send({userName: 'nike1996', password: ''})
        .expect(400, '用户名或密码不能为空', finish(done));
    });
    it('用户名为空', (done) => {
      request(app)
        .post('/api/sessions')
        .send({userName: '', password: '123456'})
        .expect(400, '用户名或密码不能为空', finish(done));
    });
  });
  describe('提交数据格式不正确', () => {
    it('用户名不正确', (done) => {
      request(app)
        .post('/api/sessions')
        .send({userName: 'nike1997', password: '123456'})
        .expect(401, '用户名不存在', finish(done));
    });
    it('密码不正确', (done) => {
      request(app)
        .post('/api/sessions')
        .send({userName: 'nike1996', password: '123457'})
        .expect(401, '密码错误', finish(done));
    });
  });
});
