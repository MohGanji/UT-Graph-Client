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
import ProgressBar from 'react-progress-bar-plus';
import defaultProfileImage from '../../images/defaultProfile.svg';
import AboutMeImage from '../../images/resume.svg';
import TitleHolder from '../../Utils/TitleHolder';
import ReactHtmlParser from 'react-html-parser';

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

class User extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {},
      eventsAsAdmin: [],
      eventsAsAttendant: [],
      eventsAsStaff: [],
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
        that.setState({
          user: info.user,
          eventsAsAdmin: info.eventsAsAdmin,
          eventsAsAttendant: info.eventsAsAttendant,
          eventsAsStaff: info.eventsAsStaff
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ loading: false });
  }

  componentWillReceiveProps () {
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
        that.setState({
          user: info.user,
          eventsAsAdmin: info.eventsAsAdmin,
          eventsAsAttendant: info.eventsAsAttendant,
          eventsAsStaff: info.eventsAsStaff
        });
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

    let userEventsAsStaff = this.state.eventsAsStaff.map((event, i) => (
      <UserEventBox key={i} event={event} />
    ));

    let userEventsAsAdmin = this.state.eventsAsAdmin.map((event, i) => (
      <UserEventBox key={i} event={event} />
    ));

    return (
      <div className="container">
        <ProgressBar
          percent={this.state.loading ? 0 : 100}
          spinner={false}
          autoIncrement={true}
        />
        <Header />
        <BackgroundCover />
        <div className="user_info">
          <div className="profile_photo_container">
            {this.state.user.image === '' ? (
              <img
                className="profile_photo"
                src={defaultProfileImage}
                alt="عکس کاربر"
              />
            ) : (
              <img
                className="profile_photo"
                src={this.state.user.image}
                alt="عکس کاربر"
              />
            )}
          </div>
          <div className="user_name">
            <p id="user_name" className="user_about_text">
              {this.state.user.firstName} {this.state.user.lastName}
            </p>
            <Link to={`/user/${this.state.user.username}`}>
              <p id="user_username">@{this.state.user.username}</p>
            </Link>
          </div>
          <div className="user_about_container">
            <div className="user_about_title">
              <TitleHolder
                image={AboutMeImage}
                title=" درباره من: "
                customHeight="45px"
                customWidth="275px"
              />
            </div>
            <div className="user_about_description">
              <p>{ReactHtmlParser(this.state.user.bio)}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="event_container_all">
          <div className="event_container_all_title">
            <p>رویداد های کاربر:</p>
          </div>
          <div className="event_container">
            {userEventsAsAdmin} {userEventsAsStaff}
          </div>
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
