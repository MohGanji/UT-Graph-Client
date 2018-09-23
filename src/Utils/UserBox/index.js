import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../images/defaultProfile.svg';
import { Link } from 'react-router-dom';

export default class UserBox extends React.Component {
  render () {
    return (
      <div className="user_box">
        <Link to={`/user/${this.props.user.username}`}>
          <div className="user_box_image">
            {this.props.user.image ===
            'http://localhost:8080/public/defaultProfile.svg' ? (
                <img src={defaultProfileImage} alt="عکس کاربر" />
              ) : (
                <img src={this.props.user.image} alt="عکس کاربر" />
              )}
          </div>
          <div className="user_box_info">
            <p>@{this.props.user.username}</p>
            <p className="user_box_name">
              {this.props.user.firstName + ' ' + this.props.user.lastName}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

UserBox.propTypes = {
  user: PropTypes.object.isRequired
};
