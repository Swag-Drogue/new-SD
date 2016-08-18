'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from './finish';

fdescribe('users-api', () => {

  it('注册成功', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'O1o2y354', password: '123456'})
      .expect({httpCode: 201, message: '注册成功'}, function (err, Users) {
        finish(done)(err);
      });

  });
  it('用户名位数错误(5位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '12345', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });

  it('用户名位数错误(21位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '123456789123456789456', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('密码位数错误(5位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '123456', password: '12345'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('密码位数错误(7位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '123456', password: '1234567'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('用户名密码位数都错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '1234', password: '1234567'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('用户名格式错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '1234*689fsf', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('密码格式都错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '1234jvfdh', password: '1234_5'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('用户名密码格式都错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '12**569', password: '123_56'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, function (err, Users) {
        finish(done)(err);
      })
  });
  it('用户名已存在', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'O1o2y354', password: '123456'})
      .expect({httpCode: 409, message: '该用户已存在'}, function (err, data) {
        finish(done)(err);
      })
  });e

})
;

