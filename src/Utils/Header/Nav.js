import React from 'react';
import './nav.css';
import logo from '../../images/logo.png';
import background from '../../images/background.jpg'
import SearchBar from './SearchBar';

import Popup from "reactjs-popup";
import Login from '../../Components/Login/login'
import Register from '../../Components/Register/Register'


const contentStyle = {
  height: "innerHeight",
  width: "innerWidth",
  "z-index": "1",
  padding: "0px",
  // ,
  // display: flex
};


const inner_div = {
  // opacity: "0.2",
  background: "#000000cc",
  "z-index": "0",
};

export default class Nav extends React.Component {
  render() {
    return (
      <div class="navbar">
        <ul>
          <li><a class="navbar_a" id="logoLink" href={'/'}> <img id="logoImage" src={logo} /></a></li>
          <li class="navbar_search"> <SearchBar /></li>

          <li class="rightElement">
            <Popup trigger={
              <a class="navbar_a" href="#">
                ورود
              </a>}
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              {close => (
                <div>
                  <span class="close" onClick={close}>
                    &times;
                  </span>
                  <Login />
                </div>
              )}
            </Popup>
          </li>
          <li class="active">
            <Popup trigger={
              <a class="navbar_a" href="#">
                ثبت نام
              </a>}
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              {close => (
                <div>
                  <span class="close" onClick={close}>
                    &times;
                  </span>
                  <Register />
                </div>
              )}
            </Popup>
          </li>
        </ul>
      </div>
    );
  }
}