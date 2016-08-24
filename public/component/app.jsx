import React from 'react';
import MenuList from './menu-list.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <MenuList/>
        <div>{this.props.children}</div>
      </div>
    )
  }
}
