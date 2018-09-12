import React from 'react';
import './style.css';
import handleErrors from '../../Utils/functions/handleErrors';
import Header from '../../Utils/Header';
import BackgroundCover from './BackgroundCover/';
import UserEventBox from './UserEventBox/';
import NotFound from '../NotFound';
import Footer from '../../Utils/Footer';
import PropTypes from 'prop-types';

export default class User extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      info: {},
      events: [],
      notFound: false,
      image: ''
    };
  }

  componentDidMount () {
    let that = this;
    const id = this.props.match.params.id;

    fetch(`/api/v1/user/${id}`)
      .then(handleErrors)
      .then(function (response) {
        if (response.status === 404) {
          that.setState({ notFound: true });
        }
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (info) {
        that.setState({ info: info });
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
        that.setState({ events: events });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    if (this.state.notFound === true) {
      return <NotFound />;
    }
    let userInfo =
      this.state.info.info == null ? 'دانشجو' : this.state.info.info;
    let userEvents = this.state.events.map((event, i) => (
      <UserEventBox key={i} event={event} />
    ));
    // alert(this.state.info.image);

    return (
      <div className="user">
        <Header />
        <BackgroundCover />
        <div className="user_info">
          <div className="profile_photo_container">
            <img
              className="profile_photo"
              src={this.state.info.image}
              alt="عکس کاربر"
            />
          </div>
          <div className="user_about">
            <p id="user_name" className="user_about_text">
              {' '}
              {this.state.info.firstName} {this.state.info.lastName}
            </p>
            <p className="user_about_text"> {userInfo} </p>
          </div>
        </div>
        <hr />
        <div
          style={
            this.state.events.length === 0
              ? { display: 'none' }
              : { display: 'block' }
          }
          className="event_container_all"
        >
          <div className="event_container_all_title">
            <p>رویداد های کاربر:</p>
          </div>
          <div className="event_container">{userEvents}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
