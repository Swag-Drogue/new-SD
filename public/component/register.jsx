import React, {Component} from 'react';
import request from 'superagent';
import {Link, hashHistory} from  'react-router';
import '../style/register.css';
import {validUserName, validPassword} from '../../shared/register-validation.js';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmPassword: '',
      userNameError: '',
      passwordError: '',
    }
  }

  render() {
    return (
      <form className="register-body form-horizontal" onSubmit={this._onSubmit.bind(this)}>
        <div className="enter-form">
          <span className="register"> 注册Swag Drogue  </span>
          <span className="login-in"><Link to="/login">登录</Link></span>
        </div>
        <div className="form-group edit-lines">
          <label htmlFor="register-name" className="col-xs-4 control-label"><img src="./images/reg.png"/> &nbsp;用 户 名 ：</label>
          <div className="col-xs-8">
            <input type="text" placeholder="请输入6到20位数字字母" id="register-name" className="register-name form-control"
                   onChange={this._onUserNameChange.bind(this)}
                   onBlur={this._checkUserName.bind(this)}/>
          </div>
          <span>{this.state.userNameError}</span>
        </div>
        <div className="form-group edit-lines">
          <label htmlFor="register-password" className="col-xs-4 control-label"><img src="images/key.png"/>&nbsp;
            密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
          <div className="col-xs-8">
            <input type="password" placeholder="请输入6位密码" id="register-password"
                   className="register-password form-control"
                   onChange={this._onPasswordChange.bind(this)}
                   onBlur={this._checkPassword.bind(this)}/>
          </div>
          <span>{this.state.passwordError}</span>
        </div>
        <div className="form-group edit-lines">
          <label htmlFor="register-confirm-password" className="col-xs-4 control-label"><img src="images/conKey.png"/>确认密码：</label>
          <div className="col-xs-8">
            <input type="password" placeholder="请确认你的密码" id="register-comfirm-password"
                   className="register-password form-control"
                   value={this.state.confirmPassword}
                   onChange={this._onConfirmChange.bind(this)}/>
          </div>
        </div>
        <div className="button">
          <button className="btn btn-primary" type="submit">
            注&nbsp;&nbsp;&nbsp;&nbsp;册
          </button>
        </div>
      </form>
    )
  }

  _onUserNameChange(event) {
    this.setState({
      userName: event.target.value,
      userNameError: ''
    });
  }

  _checkUserName(event) {
    if (validUserName(event.target.value)) {
      this.setState({userNameError: ''});
    } else {
      this.setState({userNameError: '请输入6到20位数字或字母用户名'});
    }
  }

  _onPasswordChange(event) {
    this.setState({
      password: event.target.value,
      passwordError: ''
    });
  }

  _checkPassword(event) {
    if (validPassword(event.target.value)) {
      this.setState({passwordError: ''});
    } else {
      this.setState({passwordError: '请输入6位数字密码'});
    }
  }

  _onConfirmChange(event) {
    this.setState({
      confirmPassword: event.target.value
    })
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.state.confirmPassword === this.state.password) {
      request.post('/api/users')
        .send({
          userName: this.state.userName,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        })
        .end((err, res) => {
          if (err) return alert(res.text);
          alert(res.text);
          hashHistory.push('/login');
        })
    } else {
      alert('两次输入密码不一致')
    }
  }
}
