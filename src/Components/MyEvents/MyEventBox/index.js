import React from 'react';
import './style.css';
import getDateString from '../../../Utils/functions/getDateString';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

class MyEventBox extends React.Component {
  render () {
    return (
      <div className="my_event_box_container">
        <div className="my_event_box_image_container">
          <div className="my_event_box_image">
            <a href={`/event/${this.props.event._id}`}>
              <img src={this.props.event.image} />
            </a>
          </div>
        </div>
        <div className="my_event_box_info_container">
          <div className="my_event_box_info_container_title">
            <a href={`/event/${this.props.event._id}`}>
              {this.props.event.title}
            </a>
          </div>
          <div className="my_event_box_info_container_rest">
            <p>
              <span>تاریخ شروع:</span>{' '}
              <span>{getDateString(new Date(this.props.event.beginTime))}</span>
            </p>
            <p>
              <span>تاریخ پایان:</span>{' '}
              <span>{getDateString(new Date(this.props.event.beginTime))}</span>
            </p>
          </div>
        </div>
        <div className="my_event_box_buttons">
          <div className="my_event_box_buttons_container">
            <a
              href={`event/${this.props.event._id}`}
              style={
                this.props.event.organizer === this.props.user.username
                  ? { display: 'block' }
                  : { display: 'none' }
              }
            >
              ویرایش
            </a>
            <a href={`event/${this.props.event._id}`}>مشاهده رویداد</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyEventBox);

MyEventBox.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
