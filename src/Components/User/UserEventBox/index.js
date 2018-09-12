import React from 'react';
import './style.css';
import MapImage from '../../../images/map.svg';
import CalenderImage from '../../../images/calender.svg';
import RoleImage from '../../../images/role.svg';
import TitleHolder from '../../../Utils/TitleHolder';
import getDateString from '../../../Utils/functions/getDateString';
import PropTypes from 'prop-types';

export default class UserEventBox extends React.Component {
  render () {
    return (
      <div className="user_event_container">
        <div className="user_event_title">
          <a href={`/event/${this.props.event._id}`}>
            <p>{this.props.event.title}</p>
          </a>
        </div>

        <div className="user_event_rest">
          <div className="user_event_poster">
            <img
              className="cover"
              src={this.props.event.image}
              alt="عکس رویداد"
            />
          </div>
          <div className="user_event_info">
            <TitleHolder
              image={RoleImage}
              title={
                this.props.event.role === 'ORGANIZER'
                  ? 'برگزار کننده'
                  : 'شرکت کننده'
              }
            />
            <TitleHolder image={MapImage} title={this.props.event.location} />
            <TitleHolder
              image={CalenderImage}
              title={getDateString(new Date(this.props.event.beginTime))}
            />
          </div>
        </div>
      </div>
    );
  }
}

UserEventBox.propTypes = {
  event: PropTypes.object.isRequired
};
