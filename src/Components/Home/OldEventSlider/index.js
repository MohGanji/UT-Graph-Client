import React from 'react';
import './style.css';
import Slider from 'react-slick';

export default class OldEventSlider extends React.Component {
  render () {
    const eventsLength = this.props.events.length;
    let centerMode, slidesToShow;
    if (eventsLength > 3) {
      slidesToShow = 3;
      centerMode = true;
    } else {
      slidesToShow = eventsLength;
      centerMode = false;
    }
    var settings = {
      className: 'cen ter',
      centerMode: centerMode,
      infinite: true,
      centerPadding: '70px',
      slidesToShow: slidesToShow,
      speed: 500,
      autoplay: true
    };
    return (
      <div className="old_box">
        <div className="home_old_events_title">
          <p>رویداد های برگزار شده:</p>
          <a className="load_more_button" href="/events">
            مشاهده رویداد های بیشتر
          </a>
        </div>
        <Slider {...settings}>{this.props.events}</Slider>
      </div>
    );
  }
}
