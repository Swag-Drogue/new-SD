import Register from './register.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Register />,
  document.getElementById("content")
);

if (module.hot) {
  module.hot.accept();
}
