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
          <p class=" footer_info_text">است&nbsp;<a href="/" >UT Graph</a>  &nbsp;تمامی حقوق مادی و معنوی این سایت متعلق به تیم </p>
        </div>
      </div >
    );
  }
}