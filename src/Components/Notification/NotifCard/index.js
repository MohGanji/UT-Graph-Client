import React from 'react';
import './style.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Ignore from '../../../images/cancel(1).svg'
import Confirm from '../../../images/checked.svg'

export default class NotifCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasButton: false,
      off: false
    };

    this.acceptNotif = this.acceptNotif.bind(this);
    this.rejectNotif = this.rejectNotif.bind(this);
  }

  componentDidMount() {
    this.setState({
      hasButton: this.props.notification.hasButton,
      off: this.props.notification.off
    });
  }

  acceptNotif() {
    const id = this.props.notification._id;
    fetch(`/api/v1/notification/${id}/accept`, {
      headers: {
        authorization: localStorage.getItem('accessToken')
      },
      method: 'POST'
    }).catch(function (error) {
      console.log(error);
    });

    this.setState({ hasButton: false, off: true });
    toast.info('درخواست ' + this.props.notification.applicant + ' تایید شد');
  }

  rejectNotif() {
    const id = this.props.notification._id;
    fetch(`/api/v1/notification/${id}/reject`, {
      headers: {
        authorization: localStorage.getItem('accessToken')
      },
      method: 'POST'
    }).catch(function (error) {
      console.log(error);
    });

    this.setState({ hasButton: false, off: true });
    toast.info('درخواست ' + this.props.notification.applicant + ' رد شد');
  }

  render() {
    let buttons;
    if (this.state.hasButton) {
      buttons = (
        <div className="notification_button">
          <img id="accept_button" src={Confirm} onClick={this.acceptNotif}>
            {/* {' '}
            تایید{' '} */}
          </img>
          <img id="reject_button" src={Ignore} onClick={this.rejectNotif}>
            {/* {' '}
            رد{' '} */}
          </img>
        </div>
      );
    }
    const selectedBoxClass = this.props.selected ? 'selected_box' : '';
    const buttonBoxClass = this.state.hasButton ? 'button_box' : '';
    const offBoxClass = this.state.off ? 'off_box' : '';

    return (
      <div
        id="container"
        className={
          'notification_card_container ' +
          selectedBoxClass +
          ' ' +
          buttonBoxClass +
          ' ' +
          offBoxClass
        }
      >
        <div className="notification_message">
          {this.props.notification.message}
        </div>
        {buttons}
      </div>
    );
  }
}

NotifCard.propTypes = {
  notification: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired
};
