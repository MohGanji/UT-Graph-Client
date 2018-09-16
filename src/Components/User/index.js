import React from 'react';
import './style.css';
import handleErrors from '../../Utils/functions/handleErrors';
import Header from '../../Utils/Header';
import BackgroundCover from './BackgroundCover/';
import UserEventBox from './UserEventBox/';
import NotFound from '../NotFound';
import Footer from '../../Utils/Footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import ProgressBar from 'react-progress-bar-plus';
import defaultProfileImage from '../../images/defaultProfile.svg';

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

class User extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      info: {},
      events: [],
      notFound: false,
      image: '',
      loading: true
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
        console.log(info);
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
    this.setState({ loading: false });
  }

  render () {
    if (this.state.notFound === true) {
      return <NotFound />;
    }
    let userEvents = this.state.events.map((event, i) => (
      <UserEventBox key={i} event={event} />
    ));

    return (
      <div className="user">
        <ProgressBar
          percent={this.state.loading ? 0 : 100}
          spinner={false}
          autoIncrement={true}
        />
        <Header />
        <BackgroundCover />
        <div className="user_info">
          <div className="profile_photo_container">
            {this.state.info.image ===
            'http://localhost:8080/public/defaultProfile.svg' ? (
                <img
                  className="profile_photo"
                  src={defaultProfileImage}
                  alt="عکس کاربر"
                />
              ) : (
                <img
                  className="profile_photo"
                  src={this.state.info.image}
                  alt="عکس کاربر"
                />
              )}
          </div>
          <div className="user_about">
            <p id="user_name" className="user_about_text">
              {' '}
              {this.state.info.firstName} {this.state.info.lastName}
            </p>
            <div className="user_about_container">
              <p> {ReactHtmlParser(this.state.info.bio)}</p>
            </div>
            <div className="user_about_button_container">
              <Link to={`/edit-profile`}>
                <button
                  hidden={
                    this.props.match.params.id !== this.props.user.username
                  }
                  className="user_about_button_edit_profile"
                >
                  ویرایش پروفایل
                </button>
              </Link>
              <Link to={`/my-events`}>
                <button
                  hidden={
                    this.props.match.params.id !== this.props.user.username
                  }
                  className="user_about_button_my_events"
                >
                  رویداد های من
                </button>
              </Link>
            </div>
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
  }),
  user: PropTypes.object
};

export default connect(mapStateToProps)(User);
