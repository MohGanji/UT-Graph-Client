import React from 'react';
import './Notification.css'
import Header from '../../Utils/Header';
import NotifCard from './NotifCard';
import makeNotifMessage from '../../Utils/makeNotifMessage';
import Footer from '../../Utils/Footer';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    }
  }

  componentDidMount() {
    var that = this;
    fetch(`/api/v1/notification/${0}`, {
      headers: {
        authorization: localStorage.getItem('token')
      },
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (data) {
        that.setState({ notifications: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const newNotif = this.state.notifications.map((notif) => {
      return makeNotifMessage(notif);
    });
    const cards = newNotif.map(
      (notif, index) => (<NotifCard notification={notif} key={index} />)
    );
    return (
      <div>
        <Header />
        <div class="notification_container_all">
          <div class="notification_title">
            <p> لیست تذکر ها: </p>
          </div>
          <div class="notification_container">
            {cards}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}