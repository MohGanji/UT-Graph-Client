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
      image: ""
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
        // console.log(data);
        that.setState({ notifications: data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // axios
    //   .get(
    //   '/' + that.props.user.image,
    //   { responseType: 'arraybuffer' },
    // )
    //   .then(response => {
    //     const base64 = btoa(
    //       new Uint8Array(response.data).reduce(
    //         (data, byte) => data + String.fromCharCode(byte),
    //         '',
    //       ),
    //     );
    //     that.setState({ image: "data:;base64," + base64 });
    //   });
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
  }

  closeNotification() {
    document.getElementById('notifications_box').style.display = 'none';
    document.getElementById('invisible_box').style.display = 'none';
  }

  render() {
    // console.log(this.props.user);
    // console.log("sssssss");
    let show_image = '/' + this.props.user.image;
    const newNotif = this.state.notifications.map((notif) => {
      return makeNotifMessage(notif);
    });
    newNotif.reverse();
    let notifElement = newNotif.map((notif) => {
      // console.log(notif.message);
      return (
        <a href={`/notification/${notif.index}`} >
          {notif.message}
        </a>
      )
    });
    if (this.state.notifications.length === 0)
      notifElement = <p class="notification_box_empty"> اطلاعیه تازه ای ندارید! </p>
    const createEventClass = (this.props.user.role !== "ADMIN") ? "logged_in_option_create_event" : "";
    return (
      <div class="logged_in_option_container" >
        <div onClick={this.closeNotification} id="invisible_box" class="notification_invisible">
        </div>
        <div onClick={this.showNotifications} class="logged_in_option_notification">
          <div class="notification_icon">
            <i class="fa fa-bell"></i>
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