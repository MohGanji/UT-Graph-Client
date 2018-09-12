import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

export default class UserBox extends React.Component {
  render () {
    return (
      <div className="user_box">
        <a href={`/user/${this.props.user.username}`}>
          <img src={this.props.user.image} alt="عکس کاربر" />
        </a>
        <div className="user_box_info">
          <a href={`/user/${this.props.user.username}`}>
            <p>@{this.props.user.username}</p>
          </a>
          <p className="user_box_name">
            {this.props.user.firstName + ' ' + this.props.user.lastName}
          </p>
        </div>
      </div>
    );
  }
}

UserBox.propTypes = {
  user: PropTypes.object.isRequired
};
