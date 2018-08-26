import React from 'react';
import './OldEvent.css';
import Slider from "react-slick";

export default class OldEventBox extends React.Component {

  render() {
    var settings = {
      className: "cen ter",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      speed: 500
    };
    return (
      <div class="old_box">
        <Slider {...settings}>
          {this.props.events}
        </Slider >
      </div>
    );
  }
}
