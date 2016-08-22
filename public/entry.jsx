import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login.jsx';
import Register from  './register.jsx';
import EditorBody from './edit.jsx';
import {Router, Route, hashHistory} from 'react-router';
import 'jquery';
import 'bootstrap-webpack';
import './style/register.css';
import './style/login.css';
import './style/edit.css';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/register' component={Register}/>
    <Route path='/login' component={Login}/>
    <Router path='/edit' component={EditorBody}/>
  </Router>
), document.getElementById('content'));
if (module.hot) {
  module.hot.accept();
}
