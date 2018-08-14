import React from 'react';
import './slider.css';
import 'nuka-carousel'
import Slider from "react-slick";
import BackgroundImage from '../../images/event.jpg'

export class MySlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      focusOnSelect: true,
      classsName: 'slides'
    };


    return (
      <div class="slider">
        <Slider {...settings}>
          <div>
            <img src={BackgroundImage} />
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}

