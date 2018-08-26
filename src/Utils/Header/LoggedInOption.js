import React from 'react'
import './LoggedInOption.css'
import 'font-awesome/css/font-awesome.min.css'
import profilePic from '../../images/defaultProfile.jpg'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  }
}

class LoggedInOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleExit = this.handleExit.bind(this);
  }

  handleExit() {
    localStorage.removeItem('token');
    this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' });
    toast('شما با موفقیت خارج شدید'); //funny fact: dispatch and setstate don't work together! absolutely shit
  }

  render() {
    return (
      <div class="logged_in_option_container">
        <div class="logged_in_option_notification">
          <i class="fa fa-bell notification_icon"></i>
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(LoggedInOption)