import React from 'react';
import './NotifCard.css';
import { toast } from 'react-toastify';


export default class NotifCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasBottun: Boolean
    }

    this.acceptNotif = this.acceptNotif.bind(this);
    this.rejectNotif = this.rejectNotif.bind(this);
  }

  componentDidMount() {
    this.setState({ hasBottun: this.props.notification.hasBottun });
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

    this.setState({ hasBottun: false });
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

    this.setState({ hasBottun: false });
    toast("درخواست " + this.props.notification.applicant + " رد شد");
  }

  render() {
    let buttons;
    if (this.state.hasBottun)
      buttons = (
        <div class="notification_button">
          <button id="accept_button" onClick={this.acceptNotif}> تایید </button>
          <button id="reject_button" onClick={this.rejectNotif}> رد </button>
        </div>
      )
    const selectedBoxClass = (this.props.selected ? "selected_box" : "");
    const bottunBoxClass = (this.state.hasBottun ? "bottun_box" : "");

    return (
      <div id="container"
        className={"notification_card_container " + selectedBoxClass + " " + bottunBoxClass}>
        <div class="notification_message">
          {this.props.notification.message}
        </div>
        {buttons}
      </div>
    );
  }
}