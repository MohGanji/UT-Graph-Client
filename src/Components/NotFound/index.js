import React from 'react';
import './style.css';
import Header from '../../Utils/Header';
import Footer from '../../Utils/Footer';

export default class NotFound extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div className="not_found_container">
          <p className="not_found_404">
            <span className="purple">4</span>
            <span className="blue">0</span>
            <span className="purple">4</span>
          </p>
          <p className="not_found_title">صفحه مورد نظر شما پیدا نشد!</p>
        </div>
        <Footer />
      </div>
    );
  }
}
