import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

export default class UserBox extends React.Component {
  render () {
    return (
      <a href={`/user/${this.props.user.username}`}>
        <div className="user_box">
          <img src={this.props.user.image} />
          <div className="user_box_info">
            <a href={`/user/${this.props.user.username}`}>
              <p>@{this.props.user.username}</p>
            </a>
            <p className="user_box_name">
              {this.props.user.firstName + ' ' + this.props.user.lastName}
            </p>
          </div>
        </div>
      </a>
    );
  }
}

UserBox.propTypes = {
  user: PropTypes.object.isRequired
};
