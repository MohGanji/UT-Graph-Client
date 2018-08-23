import React from 'react';
import './slider.css';
import 'nuka-carousel'
import Slider from "react-slick";
import BackgroundImage from '../../images/hojjat.jpg'
import BackgroundImage2 from '../../images/event3.jpg'
import BackgroundImage3 from '../../images/hojjat4.jpg'
import BackgroundImage4 from '../../images/hojjat5.jpg'
import BackgroundImage5 from '../../images/hojjat6.jpg'
import BackgroundImage6 from '../../images/hojjat7.jpg'
import sliderImage from '../../images/eventSlider.jpg';

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "inline", background: "red" }}
//       onClick={onClick}
//     >salam</div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "inline", background: "green", color: "red" }}
//       onClick={onClick}
//     />
//   );
// }

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button {...props} style={{ fontSize: "40px", display: 'block', left: "10px", zIndex: "15", height: "40px", width: "innerWidth", opacity: "1", color: "blue!important" }} >
      <span> </span>
    </button>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button {...props} style={{ fontSize: "40px", display: 'block', right: "10px", zIndex: "15", height: "40px", width: "innerWidth", opacity: "1", color: "blue" }} >
      <span> </span>
    </button>
  );
}

// var NextArrow = React.createClass({
//   render: function () {
//     return <button {...this.props} style={{ fontSize: "40px", display: 'block', right: "100px", zIndex: "15", height: "40px", width: "40px", opacity: "1", color: "White" }} >
//       <span className="icon icon-chevron-with-circle-right"></span>
//     </button>;
//   }
// });



export class MySlider extends React.Component {
  render() {
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

    const sliderEvents = this.props.events.map(
      (event) =>
        <div>
          <a href="#"><img src={event.poster_path == null ? sliderImage : event.poster_path} /></a>
          {/* <p class="slider_text">{event.title}</p> */}
        </div>
    );

    return (
      <div class="slider">
        <Slider {...settings}>
          {sliderEvents}
          {/* <div>
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
          </div> */}
        </Slider>
      </div>
    );
  }
}

