import React from 'react';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';

class MenuList extends React.Component {
  render() {
    return (
      <header className="top-header">
        <Link to="/index">
        <img className="img-responsive img-circle SD-logo" src="../images/SD_logo.png"/>
          </Link>
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
      .delete('/api/sessions/current')
      .end((err, res)=> {
        if (err) alert(err);
        hashHistory.push('/index');
      });
  }
}

export default MenuList;
