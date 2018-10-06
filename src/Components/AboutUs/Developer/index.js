import React from 'react';
import './style.css';
import picture from '../../../images/profilePic.jpg';
import PropTypes from 'prop-types';

export default class Developer extends React.Component {
  render () {
    return (
      <div className="card">
        <img id="developer_img" src={picture} alt="عکس کاربر" />
        <div className="developer_card_text">
          {this.props.details.name}
          <br />
          {this.props.details.username}
          <br />
          {this.props.details.email}
        </div>
      </div>
    );
  }
}

Developer.propTypes = {
  details: PropTypes.object
};
