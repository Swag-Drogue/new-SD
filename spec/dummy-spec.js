'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from '../spec/finish';
import db from '../app/db/db';
import {User} from '../app/db/schema';

describe('test true', () => {
  beforeEach((done) => {
    db.connect('test', (err) => {
      if (err) return done.fail(err);
      User.find().remove(finish(done));
    });
  });

  it('用户名和密码正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '123456'})
      .expect({httpCode: 201, message: '注册成功'}, finish(done));
  });

});

describe('unit count', () => {
  it('用户名位数不正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, finish(done));
  });

  it('密码位数不正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '12345'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, finish(done));
  });

  it('用户名和密码位数不正确', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike', password: '12345'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, finish(done));
  });
});

describe('unit string number', () => {
  it('用户名有不能识别的字符', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike_+', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, finish(done));
  });

  it('密码有不能识别的字符', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '1234_+'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, finish(done));
  });

  it('用户名密码有不能识别的字符', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike_+', password: '123456'})
      .expect({httpCode: 400, message: '用户名只能是6-20位数字、字母组成，密码只能是6位数字'}, finish(done));
  });

});

describe('unit undefined', () => {
  it('用户名为空', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '', password: '123456'})
      .expect({httpCode: 400, message: '用户名和密码不能为空'}, finish(done));
  });

  it('密码为空', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike0000', password: ''})
      .expect({httpCode: 400, message: '用户名和密码不能为空'}, finish(done));
  });

  it('用户名密码为空', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '', password: ''})
      .expect({httpCode: 400, message: '用户名和密码不能为空'}, finish(done));
  });
});

describe('test already exist', () => {

  it('用户名已存在', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'nike1996', password: '123456'})
      .expect({httpCode: 409, message: '该用户已存在'}, finish(done));
  });
  afterEach((done) => {
    db.close(finish(done));
  });
});
