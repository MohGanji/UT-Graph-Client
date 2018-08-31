import React from 'react';
import './Footer.css';
import graphImage from '../../images/graph.svg';
import logo from '../../images/logo.svg'
import LoginRegisterOption from '../Header/LoginRegisterOption';

export default class Footer extends React.Component {
  render() {
    return (
      <div class="footer">
        <div class="footer_img" >
        </div>
        <div class="footer_info" >
          <div class="footer_info_logo" >
            <a href="/" ><img class="footer_info_logo" src={logo} /> </a>
          </div>
          <div class="footer_info_text">
          </div>
        </div>
      </div >
    );
  }
}