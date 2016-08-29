import React from 'react';
import {Link, hashHistory} from 'react-router';
import request from 'superagent';
import '../style/menu-list.css';

class MenuList extends React.Component {
  render() {
    return (
      <header className="top-header">
        <Link to="/index">
          <img className="img-responsive img-circle SD-logo" src="../images/SD_logo.png"/>
        </Link>
        <div className="menu">
          <Link to="/index">首页&nbsp;</Link>
          <Link to="/edit">编辑博文</Link>
        </div>
        <div className="login">
          <Link to="/login">登录</Link>
          <Link to="/register">注册</Link>
          <Link to="" onClick={this._logOut.bind(this)}>退出</Link>
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
