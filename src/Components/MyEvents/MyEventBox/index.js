import React from 'react';
import './style.css';
import getDateString from '../../../Utils/functions/getDateString';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import defaultEventImage from '../../../images/defaultEvent.svg';
import { toast } from 'react-toastify';

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
          toast.success('رویداد شما با موفقیت حذف شد!');
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
      <div
        className="my_event_box_container"
        to={`/event/${this.props.event._id}`}
      >
        <div className="my_event_box_image_container">
          <div className="my_event_box_image">
            <Link to={`/event/${this.props.event._id}`}>
              {this.props.event.image === '' ? (
                <img src={defaultEventImage} alt="عکس رویداد" />
              ) : (
                <img src={this.props.event.image} alt="عکس رویداد" />
              )}
            </Link>
          </div>
        </div>
        <div className="my_event_box_info_container">
          <div className="my_event_box_info_container_title">
            <Link to={`/event/${this.props.event._id}`}>
              {this.props.event.title}
            </Link>
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
            <Link
              to={`event/${this.props.event._id}/edit`}
              style={
                this.props.isAdmin ? { display: 'block' } : { display: 'none' }
              }
            >
              ویرایش
            </Link>
            <a
              style={
                this.props.isAdmin ? { display: 'block' } : { display: 'none' }
              }
              onClick={this.handleDelete}
            >
              حذف رویداد
            </a>
            <Link
              to={`/event/${this.props.event._id}`}
              style={
                !this.props.isAdmin ? { display: 'block' } : { display: 'none' }
              }
            >
              مشاهده رویداد
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyEventBox);

MyEventBox.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool
};
