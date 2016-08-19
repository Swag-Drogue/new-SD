import React, {Component} from 'react';
import request from 'superagent';
import {checkPassword, checkUserName} from '../shared/register-validation-ui.js';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmPassword: '',
      userNameError: '',
      passwordError: '',
      confirmPasswordError: ''
    }
  }

  render() {
    return (
      <div className="register-body">
        <div className="enter-form">
          <span className="register"> 注册Swag Drogue  </span>
          <span className="login-in"> 登录</span>
        </div>
        <div className="enter-button">
          <ul>
            <li className="edit-lines"><img className="picture" src="images/reg.png"/>
              <input type="text" placeholder="请输入8到20位数字字母" className="register-name"
                     onChange={this._onUserNameChange.bind(this)}
                     onBlur={this._checkUserName.bind(this)}/>
              <span>{this.state.userNameError}</span>
            </li>
            <li className="edit-lines"><img className="picture" src="images/key.png"/>
              <input type="password" placeholder="请输入6位密码" className="register-password"
                     onChange={this._onPasswordChange.bind(this)}
                     onBlur={this._checkPassword.bind(this)}/>
              <span>{this.state.passwordError}</span>
            </li>
            <li className="edit-lines"><img className="picture" src="images/conKey.png"/>
              <input type="password" placeholder="请确认你的密码" className="register-confirmPassword"
                     onChange={this._onConfirmPasswordChange.bind(this)}
                     onBlur={this._checkConfirmPassWord.bind(this)}/>
              <span>{this.state.confirmPasswordError}</span>
            </li>
          </ul>
        </div>
        <div>
          <button className="button-confirm" type="submit" onClick={this._onSubmit.bind(this)}>
            注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册
          </button>
        </div>
      </div>
    )
  }

  _onUserNameChange(event) {
    this.setState({
      userName: event.target.value,
      userNameError: ''
    });
  }

  _checkUserName(event) {
    if (checkUserName(event.target.value)) {
      this.setState({userNameError: ''});
    } else {
      this.setState({userNameError: '请输入8到20位数字或字母用户名'});
    }
  }

  _onPasswordChange(event) {
    this.setState({
      password: event.target.value,
      passwordError: ''
    });
  }

  _checkPassword(event) {
    if (checkPassword(event.target.value)) {
      this.setState({passwordError: ''});
    } else {
      this.setState({passwordError: '请输入6位数字密码'});
    }
  }

  _onConfirmPasswordChange(event) {
    this.setState({
      confirmPassword: event.target.value,
      confirmPasswordError: ''
    });
  }

  _checkConfirmPassWord(event) {
    if (checkPassword(event.target.value)) {
      this.setState({confirmPasswordError: ''});
    } else {
      this.setState({confirmPasswordError: ''})
    }
  }

  _onSubmit() {
    if (this.state.userName === this.state.password) {
      request.post('/api/users')
        .send({
          userName: this.state.userName,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        })
        .end((err, res) => {
          if (err) return console.error(err);
          console.log(res.statusCode);
          alert(res.text);
        })
    } else {
      alert('两次输入密码不一致')
    }
  }
}
