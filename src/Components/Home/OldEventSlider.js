import React from 'react';
import './OldEventSlider.css';
import Slider from "react-slick";

export default class OldEventBox extends React.Component {

  render() {
    const eventsLength = this.props.events.length;
    let centerMode, slidesToShow;
    if (eventsLength > 3) {
      slidesToShow = 3;
      centerMode = true;
    }
    else {
      slidesToShow = eventsLength;
      centerMode = false;
    }
    var settings = {
      className: "cen ter",
      centerMode: centerMode,
      infinite: true,
      centerPadding: "70px",
      slidesToShow: slidesToShow,
      speed: 500,
      autoplay: true
    };
    return (
      <div class="old_box">
        <div class="home_old_events_title">
          <p>رویداد های برگزار شده:</p>
          <a class="load_more_button" href="#">مشاهده رویداد های بیشتر</a>
        </div>
        <Slider {...settings}>
          {this.props.events}
        </Slider >
      </div>
    );
  }
}
