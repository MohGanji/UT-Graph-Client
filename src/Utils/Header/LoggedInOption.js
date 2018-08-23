import React from 'react'
import './LoggedInOption.css'
import 'font-awesome/css/font-awesome.min.css'
import profilePic from '../../images/staffAvatar.png'
import { connect } from 'react-redux'

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
    this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' })
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
              <p><b> محمد هادی حجت </b></p>
            </div>
            <div class="logged_in_option_photo">
              <img src={profilePic} />
            </div>
          </div>
          <div class="drop_down_content">
            <a href="#">پروفایل</a>
            <a href="#">رویداد های من</a>
            <a href="#">ساخت رویداد</a>
            <a onClick={this.handleExit}>خروج</a>
          </div>
        </div>
      </div>
      // <div> 123 </div>
    )
  }
}

export default connect(mapStateToProps)(LoggedInOption)