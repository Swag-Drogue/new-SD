'use strict';
import request from 'supertest';
import app from '../app/server';
import {User} from '../app/db/schema';

describe('test',() => {
  beforeEach((done) => {
    User.find().remove(finish(done));
  });
  it('用户名和密码正确',(done) => {
    request(app)
      .post('/')
      .send({username:'nike1996',password:'123456'})
      .expect({httpCode:201,text:'注册成功'},function (err, User) {
        const saved = User[0];
        expect(saved.username).toEqual('nike1996');
        expect(saved.password).toEqual('123456');
        finish(done)(err);
      })
  });

  it('用户名位数不正确',(done) => {
    request(app)
      .post('/')
      .send({username:'nike',password:'123456'})
      .expect({httpCode:400,text:'用户名或密码格式不正确'},function (err, User) {
        finish(done)(err);
      })
  });

  it('密码位数不正确',(done) => {
    request(app)
      .post('/')
      .send({username:'nike1996',password:'12345'})
      .expect({httpCode:400,text:'用户名或密码格式不正确'},function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名和密码位数不正确',(done) => {
    request(app)
      .post('/')
      .send({username:'nike',password:'12345'})
      .expect({httpCode:400,text:'用户名或密码格式不正确'},function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名密码为空',(done) => {
    request(app)
      .post('/')
      .send({username:'',password:''})
      .expect({httpCode:400,text:'请输入用户名或密码'},function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名有不能使别的字符',(done) => {
    request(app)
      .post('/')
      .send({username:'nike_+',password:'123456'})
      .expect({httpCode:400,text:'用户名只能由6-20位数资或字母组成'},function (err, User) {
        finish(done)(err);
      })
  });

  it('密码有不能识别的字符',(done) => {
    request(app)
      .post('/')
      .send({username:'nike1996',password:'1234_+'})
      .expect({httpCode:400,text:'密码只能由6位数字组成'},function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名密码有不能识别的字符',(done) => {
    request(app)
      .post('/')
      .send({username:'nike_+',password:'123456'})
      .expect({httpCode:400,text:'用户名只能由6-20位数资或字母组成,密码只能由6位数字'},function (err, User) {
        finish(done)(err);
      })
  });

  it('用户名已存在',(done) =>{
    request(app)
      .post('/')
      .send({username:'nike',password:'123456'})
      .expect({httpCode:409,text:'该用户已存在'},function (err, User) {
        finish(done)(err);
      })
  });

});
