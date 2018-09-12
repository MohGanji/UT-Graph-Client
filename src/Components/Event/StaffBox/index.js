import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class StaffBox extends React.Component {
  render () {
    return (
      <div className="staff_box">
        <div className="staff_box_image">
          <img src={this.props.image} />
        </div>
        <div className="staff_box_role">
          <p> {this.props.role} </p>
        </div>
        <div className="staff_box_name">
          <p> {this.props.name} </p>
        </div>
      </div>
    );
  }
}

StaffBox.propTypes = {
  image: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
