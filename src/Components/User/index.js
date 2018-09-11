import React from 'react'
import './style.css'
import handleErrors from '../../Utils/functions/handleErrors'
import Header from '../../Utils/Header'
import BackgroundCover from './BackgroundCover/'
import ProfilePhoto from '../../images/defaultProfile.jpg'
import UserEventBox from './UserEventBox/'
import NotFound from '../NotFound'
import Footer from '../../Utils/Footer'

const axios = require('axios')

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      info: {},
      events: [],
      notFound: false,
      image: '',
    }
  }

  componentDidMount() {
    let that = this
    const id = this.props.match.params.id

    fetch(`/api/v1/user/${id}`)
      .then(handleErrors)
      .then(function(response) {
        if (response.status == 404) {
          that.setState({ notFound: true })
        }
        return response.json()
      })
      .then(function(responseJson) {
        return responseJson.data
      })
      .then(function(info) {
        that.setState({ info: info })
        // axios
        //   .get(
        //   '/' + that.state.info.image,
        //   { responseType: 'arraybuffer' },
        // )
        //   .then(response => {
        //     const base64 = btoa(
        //       new Uint8Array(response.data).reduce(
        //         (data, byte) => data + String.fromCharCode(byte),
        //         '',
        //       ),
        //     );
        //     that.setState({ image: "data:;base64," + base64 });
        //   });
      })
      .catch(function(error) {
        console.log(error)
      })

    fetch(`/api/v1/user/${id}/events`)
      .then(handleErrors)
      .then(function(response) {
        return response.json()
      })
      .then(function(responseJson) {
        return responseJson.data
      })
      .then(function(events) {
        that.setState({ events: events })
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    if (this.state.notFound == true) {
      return <NotFound />
    }
    let userInfo =
      this.state.info.info == null ? 'دانشجو' : this.state.info.info
    let userEvents = this.state.events.map(event => (
      <UserEventBox event={event} />
    ))
    // alert(this.state.info.image);

    return (
      <div class="user">
        <Header />
        <BackgroundCover />
        <div class="user_info">
          <div class="profile_photo_container">
            <img class="profile_photo" src={this.state.info.image} />
            {/* <img class="profile_photo" src={this.state.info.image} /> */}
          </div>
          <div class="user_about">
            <p id="user_name" class="user_about_text">
              {' '}
              {this.state.info.firstName} {this.state.info.lastName}
            </p>
            <p class="user_about_text"> {userInfo} </p>
          </div>
        </div>
        <hr />
        <div
          style={
            this.state.events.length == 0
              ? { display: 'none' }
              : { display: 'block' }
          }
          class="event_container_all"
        >
          <div class="event_container_all_title">
            <p>رویداد های کاربر:</p>
          </div>
          <div class="event_container">{userEvents}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
