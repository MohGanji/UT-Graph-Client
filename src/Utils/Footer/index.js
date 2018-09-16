import React from 'react';
import './style.css';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer_img" />
        <div className="footer_info">
          <p className=" footer_info_text">
            است&nbsp;
            <a href="/AboutUs">UT Graph</a> &nbsp;تمامی حقوق مادی و معنوی این سایت
            متعلق به تیم{' '}
          </p>
        </div>
      </div>
    );
  }
}
