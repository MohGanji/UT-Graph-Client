import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../images/defaultProfile.svg';

export default class UserBox extends React.Component {
  render () {
    return (
      <div className="user_box">
        <a href={`/user/${this.props.user.username}`}>
          {this.props.user.image ===
          'http://localhost:8080/public/defaultProfile.svg' ? (
              <img src={defaultProfileImage} alt="عکس کاربر" />
            ) : (
              <img src={this.props.user.image} alt="عکس کاربر" />
            )}
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
