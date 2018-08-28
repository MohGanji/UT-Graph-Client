import React from 'react';
import EventImage from '../../images/event3.jpg'
import './EventBox.css'

export default class EventBox extends React.Component {

  render() {
    var date = new Date();
    return (
      <div class="event">
        <div class="event_img">
          <a href={`/event/${this.props.event._id}`}> <img class="img_fill_div" src={this.props.event.poster_path == null ? EventImage : this.props.event.poster_path} /> </a >
        </div>
        <a href={`/event/${this.props.event._id}`}>  <div class="event_info">
          <div class="event_title">
            {this.props.event.title}
          </div>
          <div class="event_date">
            {/* //TODO: add time */}
            <span> امیرآباد </span>
            |
          <span> یکشنبه ۲۱ آذر </span>
          </div>
        </div></a>
      </div>
    );
  }
}

