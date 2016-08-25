import React from 'react';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';

class MenuList extends React.Component {
  render() {
    return (
      <header className="top-header">
        <img className="img-responsive img-circle SD-logo" src="../images/SD_logo.png"/>
        <ul className="list-inline menu">
          <li><Link to="/index">首页</Link></li>
          <li><Link to="/edit">编辑博文</Link></li>
        </ul>
        <div className="login">
          <ul className="list-inline">
            <li><Link to="/login">登录</Link></li>
            <li><Link to="/register">注册</Link></li>
            <li><Link to="" onClick={this._logOut.bind(this)}>退出</Link></li>
          </ul>
        </div>
      </header>
    )
  }

  _logOut() {
    request
      .get('/api/logOut')
      .end((err, res)=> {
        if (err) return err;
        if (res.statusCode === 200) {
          hashHistory.push('/index');
        }
      });
  }
}

export default MenuList;
