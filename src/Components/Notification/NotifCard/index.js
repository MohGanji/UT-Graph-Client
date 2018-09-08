import React from 'react'
import './style.css'
import { toast } from 'react-toastify'

export default class NotifCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasButton: false,
      off: false,
    }

    this.acceptNotif = this.acceptNotif.bind(this)
    this.rejectNotif = this.rejectNotif.bind(this)
  }

  componentDidMount() {
    this.setState({
      hasButton: this.props.notification.hasButton,
      off: this.props.notification.off,
    })
  }

  acceptNotif() {
    const id = this.props.notification._id
    fetch(`/api/v1/notification/${id}/accept`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      method: 'POST',
    }).catch(function (error) {
      console.log(error)
    })

    this.setState({ hasButton: false, off: true })
    toast('درخواست ' + this.props.notification.applicant + ' تایید شد')
  }

  rejectNotif() {
    const id = this.props.notification._id
    fetch(`/api/v1/notification/${id}/reject`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      method: 'POST',
    }).catch(function (error) {
      console.log(error)
    })

    this.setState({ hasButton: false, off: true })
    toast('درخواست ' + this.props.notification.applicant + ' رد شد')
  }

  render() {
    let buttons
    if (this.state.hasButton)
      buttons = (
        <div class="notification_button">
          <button id="accept_button" onClick={this.acceptNotif}>
            {' '}
            تایید{' '}
          </button>
          <button id="reject_button" onClick={this.rejectNotif}>
            {' '}
            رد{' '}
          </button>
        </div>
      )
    const selectedBoxClass = this.props.selected ? 'selected_box' : ''
    const buttonBoxClass = this.state.hasButton ? 'button_box' : ''
    const offBoxClass = this.state.off ? 'off_box' : ''

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
        <div class="notification_message">
          {this.props.notification.message}
        </div>
        {buttons}
      </div>
    )
  }
}
