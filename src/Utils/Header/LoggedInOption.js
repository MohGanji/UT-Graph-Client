import React from 'react';
import './LoggedInOption.css';
import 'font-awesome/css/font-awesome.min.css';
import profilePic from '../../images/defaultProfile.jpg';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import makeNotifMessage from '../../Utils/makeNotifMessage';

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
      notifications: []
    }

    this.handleExit = this.handleExit.bind(this);
    this.showNotifications = this.showNotifications.bind(this);
  }

  componentDidMount() {
    let that = this;
    console.log("salam");
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
        that.setState({ notifications: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleExit() {
    localStorage.removeItem('token');
    this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' });
    toast('شما با موفقیت خارج شدید'); //funny fact: dispatch and setstate don't work together! absolutely shit
  }

  showNotifications() {
    document.getElementById('notifications_box').style.display = 'inline';
    document.getElementById('invisible_box').style.display = 'block';
  }

  closeNotification() {
    document.getElementById('notifications_box').style.display = 'none';
    document.getElementById('invisible_box').style.display = 'none';
  }

  render() {
    const newNotif = this.state.notifications.map((notif) => {
      return makeNotifMessage(notif);
    });
    const notifElement = newNotif.map((notif) => {
      return (<p> {notif.message} </p>);
    });
    return (
      <div class="logged_in_option_container" >
        <div onClick={this.closeNotification} id="invisible_box" class="invisible">
        </div>
        <div onClick={this.showNotifications} class="logged_in_option_notification">
          <div class="notification_icon">
            <i class="fa fa-bell"></i>
          </div>
          <div id="notifications_box" class='logged_in_option_notification_content'>
            <div> <p> hello world! </p> </div>
            <p> hello world! </p>
            {notifElement}
          </div>
        </div>
        <div class="drop_down">
          <div class="logged_in_option_info drop_btn">
            <div class="logged_in_option_name">
              <p><b> {this.props.user.firstName + ' ' + this.props.user.lastName} </b></p>
            </div>
            <div class="logged_in_option_photo">
              <img src={profilePic} />
            </div>
          </div>
          <div class="drop_down_content">
            <a href={`/user/${this.props.user.username}`}>پروفایل</a>
            <a href={`/edit-profile`} >ویرایش پروفایل</a>
            <a href="#">رویداد های من</a>
            <a href={`/create-event`}>ساخت رویداد</a>
            <a onClick={this.handleExit}>خروج</a>
          </div>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps)(LoggedInOption)