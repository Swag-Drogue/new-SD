import React, {Component} from 'react'
import {Link, hashHistory} from  'react-router'
import request from 'superagent'
import '../style/login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameError: '',
      passwordError: ''
    }
  }

  render() {
    return (
      <form onSubmit={this._onSubmit.bind(this)} className="form-horizontal login-body">
        <div className="enter-form">
          <span className="register"> 登录Swag Drogue  </span>
          <span className="login-in"><Link to="/register">注册</Link></span>
        </div>
        <div className="form-group edit-lines">
          <label htmlFor="login-name" className="col-xs-4 control-label"><img src="images/reg.png"/>用户名：</label>
          <div className="col-xs-8">
            <input type="text" className="register-name form-control" id="login-name"
                   onChange={this._onUserNameChange.bind(this)}/>
          </div>
        </div>
        <div className="form-group edit-lines">
          <label htmlFor="login-password" className="col-xs-4 control-label"><img src="images/key.png"/>密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
          <div className="col-xs-8">
            <input type="password" className="register-password form-control" id="login-password"
                   onChange={this._onPasswordChange.bind(this)}/>
          </div>
        </div>
        <div className="button">
          <button className="btn btn-primary" type="submit">
            登&nbsp;&nbsp;&nbsp;&nbsp;录
          </button>
        </div>
      </form>
    )
  }

  _onUserNameChange(event) {
    this.setState({
      userName: event.target.value
    })
  }

  _onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/sessions')
      .send({
        userName: this.state.userName,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) return alert(res.text);
        alert(res.text);
        hashHistory.push('/edit');
      })

  }
}

