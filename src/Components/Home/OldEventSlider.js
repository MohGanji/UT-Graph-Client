import React from 'react';
import './OldEventSlider.css';
import Slider from "react-slick";

export default class OldEventBox extends React.Component {

  render() {
    var settings = {
      className: "cen ter",
      centerMode: true,
      infinite: true,
      centerPadding: "70px",
      slidesToShow: 3,
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
