import React from 'react';
import PropTypes from 'prop-types';
import defaultProfileImage from '../../../images/defaultProfile.svg';
import { Link } from 'react-router-dom';
import './style.css';

export default class StaffBox extends React.Component {
  render () {
    return (
      <div className="staff_box">
        <Link to={`/user/${this.props.user.username}`}>
          <div className="staff_box_image">
            {this.props.user.image ===
            'http://localhost:8080/public/defaultProfile.svg' ? (
                <img src={defaultProfileImage} alt="عکس کاربر" />
              ) : (
                <img src={this.props.user.image} alt="عکس همکار" />
              )}
          </div>
          <div className="staff_box_role">
            <p>همکار</p>
          </div>
          <div className="staff_box_name">
            <p>
              {' '}
              {this.props.user.firstName + ' ' + this.props.user.lastName}{' '}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

StaffBox.propTypes = {
  user: PropTypes.object.isRequired
};
