'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from './finish';
import {User} from '../app/db/schema';
import db from '../app/db/db';
import  async from 'async';

describe('test-success', () => {
  beforeEach((done) => {
    db.connect('test', (err) => {
      if (err) return done.fail(err);
      User.find().remove(finish(done));
    });
  });
  it('注册成功', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'O1o2y354', password: '123456'})
      .expect(201, '注册成功', finish(done));
  });
});

describe('test-error-number', () => {
  it('用户名位数错误(5位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '12345', password: '123456'})
      .expect(400, '用户名只能是6-20位数字、字母组成', finish(done));
  });

  it('用户名位数错误(21位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '123456789123456789456', password: '123456'})
      .expect(400, '用户名只能是6-20位数字、字母组成', finish(done));
  });
  it('密码位数错误(5位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '123456', password: '12345'})
      .expect(400, '密码只能是6位数字', finish(done));
  });
  it('密码位数错误(7位)', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '123456', password: '1234567'})
      .expect(400,'密码只能是6位数字', finish(done));

  });
  it('用户名密码位数都错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '1234', password: '1234567'})
      .expect(400, '用户名只能是6-20位数字、字母组成', finish(done));
  });
});

describe('test-error-formmated', () => {

  it('用户名格式错误', (done)=> {
    request(app)
      .post('/api/users')
      .send({userName: '1234*689fsf', password: '123456'})
      .expect(400,  '用户名只能是6-20位数字、字母组成', finish(done));
  });
  it('密码格式都错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '1234jvfdh', password: '1234_5'})
      .expect(400, '密码只能是6位数字', finish(done));

  });
  it('用户名密码格式都错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '12**569', password: '123_56'})
      .expect(400,  '用户名只能是6-20位数字、字母组成', finish(done));

  });
  it('用户名为空错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '', password: '123456'})
      .expect(400, '用户名和密码不能为空', finish(done));
  });
  it('密码为空错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'gerf548fsr8', password: ''})
      .expect(400, '用户名和密码不能为空', finish(done));
  });
  it('用户名密码都为空错误', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: '', password: ''})
      .expect(400,  '用户名和密码不能为空', finish(done));
  });
});
describe('test-error-exist', () => {
  it('用户名已存在', (done) => {
    request(app)
      .post('/api/users')
      .send({userName: 'O1o2y354', password: '123456'})
      .expect(409,  '该用户已存在', finish(done));
  });
  afterEach((done) => {
    db.close(finish(done));
  });
});
