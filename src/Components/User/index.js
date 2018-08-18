import React from 'react';
import './User.css';
import { handleErrors } from '../../Utils/handleErrors';
import { Header } from '../../Utils/Header';
import { BackgroundCover } from './Background_Cover';
import ProfilePhoto from '../../images/profilePic.jpg';
import NewEvents from '../Home/NewEvents';
import EventBox from '../../Utils/EventBox';
import { UserEventBox } from './UserEventBox';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      events: []
    }
  }

  componentDidMount() {
    let that = this;
    const id = this.props.match.params.id;

    fetch(`/api/v1/user/${id}`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (info) {
        that.setState({ info: info })
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(`/api/v1/user/${id}/events`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (events) {
        that.setState({ events: events })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let userInfo = this.state.info.info == null ? 'دانشجو' : this.state.info.info;
    let userEvents = this.state.events.map((event) =>
      <EventBox event={event} />
    );

    return (
      <div class="user">
        <Header />
        <BackgroundCover />
        <div class="user_info">
          <div class="profile_photo_container">
            <img class="profile_photo" src={ProfilePhoto} />
          </div>
          <div class="user_about">
            <p id="user_name" class="user_about_text"> {this.state.info.firstName} {this.state.info.lastName}</p>
            <p class="user_about_text"> {userInfo} </p>
          </div>
        </div>
        <hr />
        <div class="event_container">
          <UserEventBox />
          <UserEventBox />
          <UserEventBox />
          <UserEventBox />
          {/* {userEvents} */}
        </div>
      </div >
    );
  }
}
