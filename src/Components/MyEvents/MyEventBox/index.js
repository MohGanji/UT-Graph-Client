import React from 'react';
import './style.css';
import getDateString from '../../../Utils/functions/getDateString';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import defaultEventImage from '../../../images/defaultEvent.svg';

function mapStateToProps (state) {
  return {
    user: state.user,
    authenticated: state.authenticated
  };
}

class MyEventBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      deleted: 'false'
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete () {
    let that = this;
    let token = localStorage.getItem('accessToken');
    let url = `/api/v1/event/${this.props.event._id}`;
    let dataSend = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    };
    fetch(url, dataSend)
      .then(function (response) {
        if (response.status === 200) {
          that.setState({
            deleted: true
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    if (this.state.deleted === true) {
      return <Redirect to="/my-events" />;
    }
    return (
      <Link
        className="my_event_box_container"
        to={`/event/${this.props.event._id}`}
      >
        <div className="my_event_box_image_container">
          <div className="my_event_box_image">
            <a href={`/event/${this.props.event._id}`}>
              {this.props.event.image ===
              'http://localhost:8080/public/defaultEvent.svg' ? (
                  <img src={defaultEventImage} alt="عکس رویداد" />
                ) : (
                  <img src={this.props.event.image} alt="عکس رویداد" />
                )}
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
            <Link to={`event/${this.props.event._id}/edit`}>
              <button
                hidden={this.props.event.organizer !== this.props.user.username}
              >
                ویرایش
              </button>
            </Link>
            <Link to={`/my-events`}>
              <button onClick={this.handleDelete}>حذف رویداد</button>
            </Link>
          </div>
        </div>
      </Link>
    );
  }
}

export default connect(mapStateToProps)(MyEventBox);

MyEventBox.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
