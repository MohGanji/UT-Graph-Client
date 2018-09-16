import React from 'react';
import './style.css';
import picture from '../../../images/profilePic.jpg';

export default class Developer extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="card">
        <img id="developer_img" src={picture} />
        <div className="developer_card_text">
          {this.props.details.name}
          <br />
          {this.props.details.username}
          <br />
          {this.props.details.email}
        </div>
      </div >
    )
  }
}