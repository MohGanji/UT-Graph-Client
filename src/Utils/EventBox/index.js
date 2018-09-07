import React from 'react';
import EventImage from '../../images/event3.jpg'
import './EventBox.css'
import getDateString from '../../Utils/functions/getDateString';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class EventBox extends React.Component {

  render() {
    let show_image = '/public/' + this.props.event.image;
    AOS.init();
    var date = new Date();
    return (
      <div class="event" data-aos="zoom-in">
        <div class="event_img">
          <a href={`/event/${this.props.event._id}`}>
            <img class="img_fill_div" src={show_image} />
            {/* <img class="img_fill_div" src={this.props.event.poster_path == null ? EventImage : this.props.event.poster_path} />  */}
          </a >
        </div>
        <a href={`/event/${this.props.event._id}`}>
          <div class="event_info">
            <div class="event_title">
              {this.props.event.title}
            </div>
            <div class="event_date">
              <p>{this.props.event.location}</p> | <p>{getDateString(new Date(this.props.event.beginTime))}</p>
            </div>
          </div></a>
      </div>
    );
  }
}

