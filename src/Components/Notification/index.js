import React from 'react'
import './style.css'
import Header from '../../Utils/Header'
import NotifCard from './NotifCard/'
import makeNotifMessage from '../../Utils/functions/makeNotifMessage'
import Footer from '../../Utils/Footer'

export default class Notification extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notifications: [],
      type: String,
    }

    this.closeInvisibleBox = this.closeInvisibleBox.bind(this)
  }

  componentDidMount() {
    let type = this.props.type
    this.setState({ type: type })

    var that = this
    fetch(`/api/v1/notification/${0}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
      method: 'GET',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (responseJson) {
        return responseJson.data
      })
      .then(function (data) {
        that.setState({ notifications: data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  closeInvisibleBox() {
    document.getElementById('selected_invisible').style.display = 'none'
    this.setState({ type: 'normal' })
  }

  render() {
    const newNotif = this.state.notifications.map(notif => {
      return makeNotifMessage(notif)
    })
    newNotif.reverse()
    const cards = newNotif.map((notif, index) => {
      if (
        this.state.type == 'selected' &&
        this.props.match.params.index == notif.index
      )
        return <NotifCard selected={true} notification={notif} key={index} />
      else
        return <NotifCard selected={false} notification={notif} key={index} />
    })
    return (
      <div>
        <Header />
        <div
          onClick={this.closeInvisibleBox}
          class="selected_invisible"
          id="selected_invisible"
          style={
            this.props.type == 'selected'
              ? { display: 'inline' }
              : { display: 'none' }
          }
        />
        <div class="notification_container_all">
          <div class="notification_title">
            <p> لیست اطلاعیه ها: </p>
          </div>
          <div class="notification_container">{cards}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
