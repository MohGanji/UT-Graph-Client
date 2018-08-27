import React from 'react';
import profilePhoto from '../../images/defaultProfile.jpg'
import './UserBox.css'

export default class UserBox extends React.Component {

  render() {
    var date = new Date();
    return (
      <a href={`/user/${this.props.user.username}`} >
        <div class="user_box">
          <img src={profilePhoto} />
          <div class="user_box_info">
            <a href={`/user/${this.props.user.username}`} ><p>@{this.props.user.username}</p></a>
            <p class="user_box_name">{this.props.user.firstName + ' ' + this.props.user.lastName}</p>
          </div>
        </div>
      </a>
    );
  }
}

