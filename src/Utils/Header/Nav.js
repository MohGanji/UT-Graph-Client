import React from 'react';
import './nav.css';
import logo from '../../images/logo.png';
import background from '../../images/background.jpg'
import SearchBar from './SearchBar';

export default class Nav extends React.Component {
  render() {
    return (
      <div class="navbar">
        <div class="navbar_logo">
          <a id="logoLink" href={'/'}> <img id="logoImage" class="logo_img" src={logo} /></a>
        </div>
        <div class="navbar_search">
          <SearchBar />
        </div>
        <div class="navbar_menu">
          <div class="login_button"><a href={'/login'}>  ورود </a></div>
          <div class="register_button"><a href={'/register'}>  ثبت نام </a></div>
        </div>
      </div>
    );
  }
}