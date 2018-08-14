import React from 'react';
import './slider.css';
import 'nuka-carousel'
import Slider from "react-slick";
import BackgroundImage from '../../images/hojjat.jpg'
import BackgroundImage2 from '../../images/hojjat2.jpg'
import BackgroundImage3 from '../../images/hojjat4.jpg'
import BackgroundImage4 from '../../images/hojjat5.jpg'
import BackgroundImage5 from '../../images/hojjat6.jpg'
import BackgroundImage6 from '../../images/hojjat7.jpg'



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
      classsName: 'slides',
      fade: true
    };


    return (
      <div class="slider">
        <Slider {...settings}>
          <div>
            <img src={BackgroundImage2} />
          </div>
          <div>
            <img src={BackgroundImage3} />
          </div>
          <div>
            <img src={BackgroundImage4} />
          </div>
          <div>
            <img src={BackgroundImage5} />
          </div>
          <div>
            <img src={BackgroundImage6} />
          </div>
          <div>
            <img src={BackgroundImage4} />
          </div>
        </Slider>
      </div>
    );
  }
}

