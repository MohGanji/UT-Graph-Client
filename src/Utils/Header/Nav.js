import React from 'react';
import './nav.css';
import logo from '../../images/logo.png';
import background from '../../images/background.jpg'
import SearchBar from './SearchBar';

import Popup from "reactjs-popup";
import Login from '../../Components/Login/login'

const contentStyle = {
  height: "innerHeight",
  width: "innerWidth",
  "z-index": "1"
  // ,
  // display: flex
};


const inner_div = {
  // opacity: "0.2",
  background: "#000000cc",
  "z-index": "0"
};

export default class Nav extends React.Component {
  render() {
    return (
      <div class="navbar">
        <ul>
          <li><a id="logoLink" href={'/'}> <img id="logoImage" src={logo} /></a></li>
          <li class="navbar_search"> <SearchBar /></li>




          <li class="rightElement">
            <Popup trigger={
              <a href="#">
                ورود
              </a>}
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              <Login />
            </Popup>
          </li>
          <li id="signup" class="active"><a href={'/signup'}>ثبت نام</a></li>

        </ul>
      </div>
    );
  }
}