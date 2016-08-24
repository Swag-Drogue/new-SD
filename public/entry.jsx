import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app.jsx';
import Login from './component/login.jsx';
import Register from  './component/register.jsx';
import Editor from './component/editor.jsx';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import 'jquery';
import 'bootstrap-webpack';
import './style/register.css';
import './style/login.css';
import './style/editor.css';

const route = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Editor}/>
    <Route path='register' component={Register}/>
    <Route path='login' component={Login}/>
    <Route path='edit' component={Editor}/>
  </Route>
</Router>;


ReactDOM.render(
  route,
  document.getElementById('content'));
if (module.hot) {
  module.hot.accept();
}
