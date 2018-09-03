import React from 'react';
import './UserEventBox.css';
import BackgroundImage from '../../images/userEvent.jpg'
import MapImage from '../../images/map.svg'
import CalenderImage from '../../images/calender.svg'
import RoleImage from '../../images/role.svg';
import TitleHolder from '../../Utils/TitleHolder';
import getDateString from '../../Utils/functions/getDateString';


export class UserEventBox extends React.Component {
  render() {
    return (
      <div class="user_event_container">
        <div class="user_event_title">
          <a href={`/event/${this.props.event._id}`}><p>{this.props.event.title}</p></a>
        </div>

        <div class="user_event_rest">
          <div class="user_event_poster">
            <img class="cover" src={BackgroundImage} />
          </div>
          <div class="user_event_info">
            <TitleHolder image={RoleImage} title={this.props.event.role === 'ORGANIZER' ? 'برگزار کننده' : 'شرکت کننده'} />
            <TitleHolder image={MapImage} title={this.props.event.location} />
            <TitleHolder image={CalenderImage} title={getDateString(new Date(this.props.event.beginTime))} />
          </div>
        </div>

      </div>
    );
  }
}