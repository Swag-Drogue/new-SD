import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app.jsx';
import Index from './component/index.jsx';
import Login from './component/login.jsx';
import Register from  './component/register.jsx';
import Editor from './component/editor.jsx';
import ShareArticle from './component/personal-share.jsx';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import 'jquery';
import 'bootstrap-webpack';
import './style/register.css';
import './style/login.css';
import './style/editor.css';

const route = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path='index' component={Index}/>
    <Route path='register' component={Register}/>
    <Route path='share/:id' component={ShareArticle}/>
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
