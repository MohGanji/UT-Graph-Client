import React from 'react';
import './style.css';
import MapImage from '../../images/map.svg';
import CalenderImage from '../../images/calender.svg';
import TitleHolder from '../TitleHolder';
import getDateString from '../../Utils/functions/getDateString';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';

export default class OldEventBox extends React.Component {
  render () {
    AOS.init();
    return (
      <div className="old_event_box" data-aos="zoom-in">
        <div className="old_event_image">
          <a href={`/event/${this.props.event._id}`}>
            <img
              className="img_fill_div"
              src={this.props.event.image}
              alt="عکس رویداد"
            />
            {/* <img class="img_fill_div" src={this.props.event.poster_path == null ? EventImage : this.props.event.poster_path} /> */}
          </a>
        </div>
        <div className="old_event_title">
          <a href={`/event/${this.props.event._id}`}>
            {this.props.event.title}
          </a>
        </div>
        <div className="old_event_info">
          <div className="old_event_info_title">
            <TitleHolder image={MapImage} title={this.props.event.location} />
          </div>
          <div className="old_event_info_title">
            <TitleHolder
              image={CalenderImage}
              title={getDateString(new Date(this.props.event.endTime))}
            />
          </div>
        </div>
      </div>
    );
  }
}

OldEventBox.propTypes = {
  event: PropTypes.object.isRequired
};
