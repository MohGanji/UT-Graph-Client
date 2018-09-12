import React from 'react';
import './style.css';
import getDateString from '../../Utils/functions/getDateString';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';

export default class EventBox extends React.Component {
  render () {
    AOS.init();
    return (
      <div className="event" data-aos="zoom-in">
        <div className="event_img">
          <a href={`/event/${this.props.event._id}`}>
            <img className="img_fill_div" src={this.props.event.image} />
            {/* <img class="img_fill_div" src={this.props.event.poster_path == null ? EventImage : this.props.event.poster_path} />  */}
          </a>
        </div>
        <a href={`/event/${this.props.event._id}`}>
          <div className="event_info">
            <div className="event_title">{this.props.event.title}</div>
            <div className="event_date">
              <p>{this.props.event.location}</p> |{' '}
              <p>{getDateString(new Date(this.props.event.beginTime))}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

EventBox.propTypes = {
  event: PropTypes.object.isRequired
};
