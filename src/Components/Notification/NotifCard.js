import React from 'react';
import './NotifCard.css';
import { toast } from 'react-toastify';


export default class NotifCard extends React.Component {
  constructor(props) {
    super(props);

    this.acceptNotif = this.acceptNotif.bind(this);
    this.rejectNotif = this.rejectNotif.bind(this);
  }

  acceptNotif() {
    // console.log(this.props.notification);
    const id = this.props.notification._id;
    fetch(`/api/v1/notification/${id}/accept`, {
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'POST',
    })
      .catch(function (error) {
        console.log(error);
      });

    toast("درخواست " + this.props.notification.applicant + " تایید شد");
  }

  rejectNotif() {
    const id = this.props.notification._id;
    fetch(`/api/v1/notification/${id}/reject`, {
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'POST',
    })
      .catch(function (error) {
        console.log(error);
      });

    toast("درخواست " + this.props.notification.applicant + " رد شد");
  }

  render() {
    let buttons;
    if (this.props.notification.type == "REQUEST")
      buttons = (
        <div class="notification_button">
          <button id="accept_button" onClick={this.acceptNotif}> تایید </button>
          <button id="reject_button" onClick={this.rejectNotif}> رد </button>
        </div>
      )
    return (
      <div class="notification_card_container">
        <div class="notification_message">
          {this.props.notification.message}
        </div>
        {buttons}
      </div>
    );
  }
}