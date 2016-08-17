import React, {Component} from 'react';

export default class Register extends Component {
  render() {
    return <div>
      <div>
        <input type="text" placeholder="用户名"/>
      </div>
      <div>
        <input type="password" placeholder="密码"/>
      </div>
      <div>
        <input type="password" placeholder="再次输入密码"/>
      </div>
      <div>
        <button>注册</button>
      </div>
    </div>
  }
}
