import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import makeNotifMessage from '../../../../Utils/functions/makeNotifMessage';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../../../images/defaultProfile.svg';

function mapStateToProps (state) {
  return {
    authenticated: state.authenticated,
    user: state.user
  };
}

class LoggedInOption extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      notifications: [],
      image: '',
      unReadNotifSize: 0
    };

    this.handleExit = this.handleExit.bind(this);
    this.showNotifications = this.showNotifications.bind(this);
  }

  componentDidMount () {
    let that = this;
    fetch(`/api/v1/notification/${1}`, {
      headers: {
        authorization: localStorage.getItem('accessToken')
      },
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (data) {
        let size = data.length;
        that.setState({ notifications: data, unReadNotifSize: size });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleExit () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // fetch('/api/v1/user/logout', { method: 'POST' }); //cant be used :( asynchronous problems :(
    this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' });
    toast.info('شما با موفقیت خارج شدید');
  }

  showNotifications () {
    document.getElementById('notifications_box').style.display = 'inline';
    document.getElementById('invisible_box').style.display = 'block';

    fetch('/api/v1/notification/read-all', {
      headers: {
        authorization: localStorage.getItem('accessToken')
      },
      method: 'POST'
    });
    this.setState({ unReadNotifSize: 0 });
    document.getElementById('notification_icon').style.transform =
      'rotate(15deg)';
  }

  closeNotification () {
    document.getElementById('notifications_box').style.display = 'none';
    document.getElementById('invisible_box').style.display = 'none';

    document.getElementById('notification_icon').style.transform =
      'rotate(0deg)';
  }

  render () {
    const newNotif = this.state.notifications.map(notif => {
      return makeNotifMessage(notif);
    });
    newNotif.reverse();
    let notifElement = newNotif.map((notif, i) => {
      return (
        <Link key={i} to={`/notification/${notif.index}`}>
          {notif.message}
        </Link>
      );
    });
    if (this.state.notifications.length === 0) {
      notifElement = (
        <p className="notification_box_empty"> اطلاعیه تازه ای ندارید! </p>
      );
    }
    const createEventClass =
      this.props.user.role !== 'ADMIN' ? 'logged_in_option_create_event' : '';
    const hiddenClass =
      this.state.unReadNotifSize === 0 ? 'notification_badge_hidden' : '';
    return (
      <div id="option_container" className="logged_in_option_container">
        <div
          onClick={this.closeNotification}
          id="invisible_box"
          className="notification_invisible"
        />
        <div
          onClick={this.showNotifications}
          className="logged_in_option_notification"
        >
          <div className={'notification_badge ' + hiddenClass}>
            {this.state.unReadNotifSize}
          </div>
          <div className="notification_icon">
            <i id="notification_icon" className="fa fa-bell" />
          </div>
          <div
            id="notifications_box"
            className="logged_in_option_notification_content"
          >
            {notifElement}
            <Link to={`/notification`}>
              <div className="notification_box_footer">
                <span>مشاهده تمام اطلاعیه ها</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="drop_down">
          <div className="logged_in_option_info drop_btn">
            <div className="logged_in_option_name">
              <p>
                <b>
                  {' '}
                  {this.props.user.firstName +
                    ' ' +
                    this.props.user.lastName}{' '}
                </b>
              </p>
            </div>
            <div className="logged_in_option_photo">
              {/* <img src={this.state.image} /> */}
              {this.props.user.image ===
              'http://localhost:8080/public/defaultProfile.svg' ? (
                  <img src={defaultProfileImage} alt="عکس پروفایل" />
                ) : (
                  <img src={this.props.user.image} alt="عکس پروفایل" />
                )}
            </div>
          </div>
          <div className="drop_down_content">
            {/* change to <a /> because link doesn't load script! */}
            <a href={`/`}>خانه</a>
            <Link to={`/user/${this.props.user.username}`}>پروفایل</Link>
            <Link to={`/edit-profile`}>ویرایش پروفایل</Link>
            <Link to={`/my-events`}> رویداد های من</Link>
            <Link to={`/create-event`} className={createEventClass}>
              ساخت رویداد
            </Link>
            <a onClick={this.handleExit}>خروج</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoggedInOption);

LoggedInOption.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object.isRequired
};
