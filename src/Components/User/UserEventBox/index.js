import React from 'react';
import './style.css';
import MapImage from '../../../images/map1.svg';
import CalenderImage from '../../../images/calender1.svg';
import RoleImage from '../../../images/group1.svg';
import TitleHolder from '../../../Utils/TitleHolder';
import getDateString from '../../../Utils/functions/getDateString';
import PropTypes from 'prop-types';
import defaultEventImage from '../../../images/defaultEvent.svg';
import { Link } from 'react-router-dom';

export default class UserEventBox extends React.Component {
  render () {
    return (
      <div className="user_event_container">
        <Link to={`/event/${this.props.event._id}`}>
          <div className="user_event_title">
            <p>{this.props.event.title}</p>
          </div>

          <div className="user_event_rest">
            <div className="user_event_poster">
              {this.props.event.image === '' ? (
                <img
                  className="cover"
                  src={defaultEventImage}
                  alt="عکس رویداد"
                />
              ) : (
                <img
                  className="cover"
                  src={this.props.event.image}
                  alt="عکس رویداد"
                />
              )}
            </div>
            <div className="user_event_info">
              {/* edit to event role */}
              <TitleHolder
                image={RoleImage}
                title={
                  this.props.event.role === 'ORGANIZER'
                    ? 'برگزار کننده'
                    : 'شرکت کننده'
                }
                customHeight="45px"
              />
              <TitleHolder
                image={MapImage}
                title={this.props.event.location}
                customHeight="45px"
              />
              <TitleHolder
                image={CalenderImage}
                title={getDateString(new Date(this.props.event.beginTime))}
                customHeight="45px"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

UserEventBox.propTypes = {
  event: PropTypes.object.isRequired
};
