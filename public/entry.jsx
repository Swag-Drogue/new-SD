import React from 'react';
import ReactDOM from 'react-dom';
import Register from './register.jsx';
import {Router, Route, hashHistory} from 'react-router';
import Login from './login.jsx'

require('jquery');
require('bootstrap-webpack');
require('./style/register.css');
require('./style/login.css');


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Login}/>
    <Route path='/register' component={Register}/>
    <Route path='/login' component={Login}/>
  </Router>
), document.getElementById('content'));
if (module.hot) {
  module.hot.accept();
}
