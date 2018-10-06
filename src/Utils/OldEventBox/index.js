import React from 'react';
import './style.css';
import MapImage from '../../images/map1.svg';
import CalenderImage from '../../images/calender1.svg';
import TitleHolder from '../TitleHolder';
import getDateString from '../../Utils/functions/getDateString';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultEventImage from '../../images/defaultEvent.png';

export default class OldEventBox extends React.Component {
  render () {
    AOS.init();
    return (
      <div data-aos="zoom-in">
        <Link to={`/event/${this.props.event._id}`}>
          <div className="old_event_box">
            <div className="old_event_image">
              {this.props.event.image === '' ? (
                <img
                  className="img_fill_div"
                  src={defaultEventImage}
                  alt="عکس رویداد"
                />
              ) : (
                <img
                  className="img_fill_div"
                  src={this.props.event.image}
                  alt="عکس رویداد"
                />
              )}
              {/* <img class="img_fill_div" src={this.props.event.poster_path == null ? EventImage : this.props.event.poster_path} /> */}
            </div>
            <div className="old_event_title">{this.props.event.title}</div>
            <div className="old_event_info">
              <div className="old_event_info_title">
                <TitleHolder
                  image={MapImage}
                  title={this.props.event.location}
                  customHeight="23px"
                />
              </div>
              <div className="old_event_info_title">
                <TitleHolder
                  image={CalenderImage}
                  title={getDateString(new Date(this.props.event.endTime))}
                  customHeight="23px"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

OldEventBox.propTypes = {
  event: PropTypes.object.isRequired
};
