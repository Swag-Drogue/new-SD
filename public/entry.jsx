import React from 'react';
import ReactDOM from 'react-dom';
import Register from './register.jsx';
require('jquery');
require('bootstrap-webpack');
require('./style/register.css');

ReactDOM.render(
  <Register/>,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept();
}
