import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Nav />
      </header >
    );
  }
}