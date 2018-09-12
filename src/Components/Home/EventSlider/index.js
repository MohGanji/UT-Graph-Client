import React from 'react';
import './style.css';
import 'nuka-carousel';
import Slider from 'react-slick';
import sliderImage from '../../images/eventSlider.jpg';

function PrevArrow (props) {
  // const { className, style, onClick } = props;
  return (
    <button
      {...props}
      style={{
        fontSize: '40px',
        display: 'block',
        left: '10px',
        zIndex: '15',
        height: '40px',
        width: 'innerWidth',
        opacity: '1',
        color: 'blue!important'
      }}
    >
      <span> </span>
    </button>
  );
}

function NextArrow (props) {
  // const { className, style, onClick } = props;
  return (
    <button
      {...props}
      style={{
        fontSize: '40px',
        display: 'block',
        right: '10px',
        zIndex: '15',
        height: '40px',
        width: 'innerWidth',
        opacity: '1',
        color: 'blue'
      }}
    >
      <span> </span>
    </button>
  );
}

export default class EventSlider extends React.Component {
  render () {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      focusOnSelect: true,
      classsName: 'slides',
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

    const sliderEvents = this.props.events.map((event, i) => (
      <div key={i}>
        <a href="#">
          <img
            src={event.poster_path == null ? sliderImage : event.poster_path}
          />
        </a>
        {/* <p class="slider_text">{event.title}</p> */}
      </div>
    ));

    return (
      <div className="slider">
        <Slider {...settings}>{sliderEvents}</Slider>
      </div>
    );
  }
}
