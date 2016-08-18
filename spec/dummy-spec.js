'use strict';
import request from 'supertest';
import app from '../app/server';
import {User} from '../app/db/schema';
import finish from '../spec/finish';

describe('test', () => {

  beforeEach((done) => {
    User.find().remove(finish(done));
  });

  it('用户名和密码正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '123456'})
      .expect({httpCode: 201, massage: '注册成功'}, function (err, data) {
        User.find(function (err, users) {
          const saved = users[0];
          expect(saved.userName).toEqual('nike1996');
          expect(saved.password).toEqual('123456');
          finish(done)(err);
        });
      })
  });

  it('用户名位数不正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('密码位数不正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '12345'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名和密码位数不正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike', password: '12345'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名密码为空', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '', password: ''})
      .expect({httpCode: 400, message: '用户名和密码不能为空'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名有不能识别的字符', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike_+', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('密码有不能识别的字符', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '1234_+'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名密码有不能识别的字符', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike_+', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名已存在', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '123456'})
      .expect({httpCode: 409, message: '该用户已存在'}, function (err, User) {
        finish(done)(err);
      })
  });

});
