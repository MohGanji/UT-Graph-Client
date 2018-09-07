import React from 'react';
import './LoggedInOption.css';
import 'font-awesome/css/font-awesome.min.css';
import profilePic from '../../images/defaultProfile.jpg';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import makeNotifMessage from '../../Utils/functions/makeNotifMessage';
const axios = require('axios');

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  }
}

class LoggedInOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      image: "",
      unReadNotifSize: 0
    }

    this.handleExit = this.handleExit.bind(this);
    this.showNotifications = this.showNotifications.bind(this);
  }

  componentDidMount() {

    let that = this;
    fetch(`/api/v1/notification/${1}`, {
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'GET',
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

  handleExit() {
    localStorage.removeItem('token');
    this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' });
    toast.info('شما با موفقیت خارج شدید'); //funny fact: dispatch and setstate don't work together! absolutely shit
  }

  showNotifications() {
    document.getElementById('notifications_box').style.display = 'inline';
    document.getElementById('invisible_box').style.display = 'block';

    fetch('/api/v1/notification/read-all', {
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'POST',
    });
    this.setState({ unReadNotifSize: 0 });
    document.getElementById("notification_icon").style.transform = "rotate(15deg)";
  }

  closeNotification() {
    document.getElementById('notifications_box').style.display = 'none';
    document.getElementById('invisible_box').style.display = 'none';

    document.getElementById("notification_icon").style.transform = "rotate(0deg)";
  }

  render() {
    let show_image = '/public/' + this.props.user.image;
    const newNotif = this.state.notifications.map((notif) => {
      return makeNotifMessage(notif);
    });
    newNotif.reverse();
    let notifElement = newNotif.map((notif) => {
      return (
        <a href={`/notification/${notif.index}`} >
          {notif.message}
        </a>
      )
    });
    if (this.state.notifications.length === 0)
      notifElement = <p class="notification_box_empty"> اطلاعیه تازه ای ندارید! </p>
    const createEventClass = (this.props.user.role !== "ADMIN") ? "logged_in_option_create_event" : "";
    const hiddenClass = (this.state.unReadNotifSize === 0) ? "notification_badge_hidden" : "";
    return (
      <div id="option_container" class="logged_in_option_container" >
        <div onClick={this.closeNotification} id="invisible_box" class="notification_invisible">
        </div>
        <div onClick={this.showNotifications} class="logged_in_option_notification">
          <div class={"notification_badge " + hiddenClass}>
            {this.state.unReadNotifSize}
          </div>
          <div class="notification_icon">
            <i id="notification_icon" class="fa fa-bell"></i>
          </div>
          <div id="notifications_box" class='logged_in_option_notification_content'>
            {notifElement}
            <a href={`/notification`}>
              <div class="notification_box_footer">
                <a href={`/notification`}>
                  مشاهده تمام اطلاعیه ها
                </a>
              </div>
            </a>
          </div>
        </div>
        <div class="drop_down">
          <div class="logged_in_option_info drop_btn">
            <div class="logged_in_option_name">
              <p><b> {this.props.user.firstName + ' ' + this.props.user.lastName} </b></p>
            </div>
            <div class="logged_in_option_photo">
              {/* <img src={this.state.image} /> */}
              <img src={show_image} />
            </div>
          </div>
          <div class="drop_down_content">
            <a href={`/`}>خانه</a>
            <a href={`/user/${this.props.user.username}`}>پروفایل</a>
            <a href={`/edit-profile`}>ویرایش پروفایل</a>
            <a href={`/my-events`}> رویداد های من</a>
            <a href={`/create-event`} className={createEventClass}>ساخت رویداد</a>
            <a onClick={this.handleExit}>خروج</a>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps)(LoggedInOption)