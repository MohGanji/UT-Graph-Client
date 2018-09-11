import React from 'react'
import profilePhoto from '../../images/defaultProfile.jpg'
import './style.css'

export default class UserBox extends React.Component {
  render() {
    return (
      <a href={`/user/${this.props.user.username}`}>
        <div class="user_box">
          <img src={this.props.user.image} />
          <div class="user_box_info">
            <a href={`/user/${this.props.user.username}`}>
              <p>@{this.props.user.username}</p>
            </a>
            <p class="user_box_name">
              {this.props.user.firstName + ' ' + this.props.user.lastName}
            </p>
          </div>
        </div>
      </a>
    )
  }
}
