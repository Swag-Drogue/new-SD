import React, {Component} from 'react';
import request from 'superagent';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmPassword: ''
    }
  }

  render() {
    return <div>
      <div>
        <input type="text" placeholder="用户名"
               value={this.state.userName}
               onChange={this._onUserNameChange.bind(this)}/>
      </div>
      <div>
        <input type="password" placeholder="密码"
               value={this.state.password}
               onChange={this._onPasswordChange.bind(this)}/>
      </div>
      <div>
        <input type="password" placeholder="再次输入密码"
               value={this.state.confirmPassword}
               onChange={this._onConfirmPasswordChange.bind(this)}/>
      </div>
      <div>
        <button type="submit" onClick={this._onSubmit.bind(this)}>注册</button>
      </div>
    </div>
  }

  _onUserNameChange(event) {
    this.setState({
      userName: event.target.value
    });
  }

  _onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  _onConfirmPasswordChange(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  _onSubmit(){
    request.post('/api/users')
      .send({
        userName:this.state.userName,
        password:this.state.password
      })
      .end((err,res)=>{
        if(err) return alert(res.body.message);
        alert(res.body.message);
        res.sendStatus(res.body.httpCode);
      })
  }
}
