import React from 'react';
import './nav.css';
import logo from '../images/logo.png';
import { SearchBar } from './searchBar/searchBar';

export class Nav extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><a id="logoLink" href={'/'}> <img id="logoImage" src={logo} /></a></li>
          <li id="searchBar"><SearchBar /></li>
          <li class="rightElement"><a href={'/login'}>Login</a></li>
          <li id="signup" class="active"><a href={'/signup'}>Signup</a></li>

        </ul>
      </div>
    );
  }
}