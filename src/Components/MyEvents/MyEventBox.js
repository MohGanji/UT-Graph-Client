import React from 'react';
import './MyEventBox.css';
import defaultEventImage from '../../images/event3.jpg';
import getDateString from '../../Utils/functions/getDateString';

export default class MyEventBox extends React.Component {
  render() {
    return (
      <div class="my_event_box_container">
        <div class="my_event_box_image_container">
          <div class="my_event_box_image">
            <a href={`/event/${this.props.event._id}`}><img src={defaultEventImage} /></a>
          </div>
        </div>
        <div class="my_event_box_info_container">
          <div class="my_event_box_info_container_title">
            <a href={`/event/${this.props.event._id}`}>{this.props.event.title}</a>
          </div>
          <div class="my_event_box_info_container_rest">
            <p><span>تاریخ شروع:</span> <span>{getDateString(new Date(this.props.event.beginTime))}</span></p>
            <p><span>تاریخ پایان:</span> <span>{getDateString(new Date(this.props.event.beginTime))}</span></p>
          </div>
        </div>
        <div class="my_event_box_buttons">
          <a href={this.props.event._id}>مشاهده رویداد</a>
        </div>
      </div>
    )
  }
}
