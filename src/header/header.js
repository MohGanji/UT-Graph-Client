import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './nav';
// import logo from '../logo.svg';
// import './header.css';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <Nav />
      </header>
    );
  }
}