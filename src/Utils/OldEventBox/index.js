import React from 'react';
import './OldEventBox.css';
import EventImage from '../../images/event3.jpg'
import MapImage from '../../images/map.svg'
import CalenderImage from '../../images/calender.svg'
import TitleHolder from '../TitleHolder';
import getDateString from '../../Utils/getDateString';

export default class OldEventBox extends React.Component {

  render() {
    return (
      <a href={`/event/${this.props.event._id}`} >
        <div class="old_event_box">
          <div class="old_event_image">
            <a href={`/event/${this.props.event._id}`}> <img class="img_fill_div" src={this.props.event.poster_path == null ? EventImage : this.props.event.poster_path} /> </a >
          </div>
          <div class="old_event_title">
            {this.props.event.title}
          </div>
          <div class="old_event_info">
            <div class="old_event_info_title">
              <TitleHolder image={MapImage} title={this.props.event.location} />
            </div>
            <div class="old_event_info_title">
              <TitleHolder image={CalenderImage} title={getDateString(new Date(this.props.event.endTime))} />
            </div>
          </div>
        </div>
      </a>
    );
  }
}
