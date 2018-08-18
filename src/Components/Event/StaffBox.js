import React from 'react';
import './StaffBox.css';

export default class StaffBox extends React.Component {

  render() {
    return (
      <div class="staff_box">
        <div class="staff_box_image">
          <img src={this.props.image} />
        </div>
        <div class="staff_box_role">
          <p> {this.props.role} </p>
        </div>
        <div class="staff_box_name">
          <p> {this.props.name} </p>
        </div>
      </div >
    );
  }
}
