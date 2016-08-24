import React, {Component} from 'react'
import {Link,hashHistory} from  'react-router'
import request from 'superagent'

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
      <form>
        <div className="login-body">
          <div className="enter-form">
            <span className="register"> 登录Swag Drogue  </span>
            <span className="login-in"><Link to="/register">注册</Link></span>
          </div>
          <div className="enter-button">
            <ul>
              <li className="edit-lines"><img src="images/reg.png"/>
                <input type="text" className="register-name"
                       onChange={this._onUserNameChange.bind(this)}/>
              </li>
              <li className="edit-lines"><img src="images/key.png"/>
                <input type="password" className="register-password"
                       onChange={this._onPasswordChange.bind(this)}/>
              </li>
            </ul>
            <div className="button">
              <button className="btn btn-primary" type="submit" onClick={this._onSubmit.bind(this)}>
                登&nbsp;&nbsp;&nbsp;&nbsp;录
              </button>
            </div>
          </div>
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

  _onSubmit() {
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

