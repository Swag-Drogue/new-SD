import React from 'react';
import {Link,hashHistory} from 'react-router';
import request from 'superagent';

class MenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exit: '',
      login: '',
      register: '',
    };
  }

  componentWillMount() {
    request
      .get('/api/sessions/current')
      .end((err, res) => {
        if (err) {
          if (res.statusCode === 401) {
            return this.setState({
              login: '登陆',
              register: '注册',
              exit:''
            });
          } else{
            alert('cookie已过期，请重新登录');
            hashHistory.push('/login');
            return this.setState({
              login: '登陆',
              register: '注册',
              exit:''
            });
          }
        }
        return this.setState({
          exit: '退出',
          login:'',
          register:''
        });
      });
  }

  render() {
    return (
      <header className="top-header">
        <img className="img-responsive img-circle SD-logo" src="../images/SD_logo.png"/>
        <ul className="list-inline menu">
          <li><Link to="/index">Home</Link></li>
          <li><Link to="/share">Share</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/remmedation">Recommendation</Link></li>
        </ul>
        <div className="login">
          <ul className="list-inline">
            <li><Link to="/login">{this.state.login}</Link></li>
            <li><Link to="/register">{this.state.register}</Link></li>
            <li><Link to="/edit">编辑博文</Link></li>
            <li><Link to="" onClick={this._logOut.bind(this)}>{this.state.exit}</Link></li>
          </ul>
        </div>
      </header>
    )
  }

  _logOut(){
    request
      .get('/api/logOut')
      .end((err,res)=> {
        if (err) return err;
        if(res.statusCode===200){
          this.setState({
            exit: '',
            login: '登录',
            register: '注册'
          });
          hashHistory.push('/index');
        }
      });
  }
}

export default MenuList;
