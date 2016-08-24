import React from 'react';
import ReactDOM from 'react-dom';
import Login from './component/login.jsx';
import Register from  './component/register.jsx';
import Editor from './component/editor.jsx';
import UploadForm from './component/upload.jsx';
import {Router, Route, hashHistory} from 'react-router';
import 'jquery';
import 'bootstrap-webpack';
import './style/register.css';
import './style/login.css';
import './style/editor.css';



ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Editor}/>
    <Route path='/register' component={Register}/>
    <Route path='/login' component={Login}/>
    <Router path='/edit' component={Editor}/>
    <Router path='/upload' component={UploadForm}/>
  </Router>
), document.getElementById('content'));
if (module.hot) {
  module.hot.accept();
}
