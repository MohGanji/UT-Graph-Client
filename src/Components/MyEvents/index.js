import React from 'react';
import './style.css';
import Header from '../../Utils/Header';
import Footer from '../../Utils/Footer';
import { connect } from 'react-redux';
import handleErrors from '../../Utils/functions/handleErrors';
import MyEventBox from './MyEventBox/';
import PropTypes from 'prop-types';
import ProgressBar from 'react-progress-bar-plus';

function mapStateToProps (state) {
  return {
    user: state.user,
    authenticated: state.authenticated
  };
}

class MyEvents extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      organizer: [],
      staff: [],
      attendent: [],
      statePage: 'attendent'
    };
    this.changeState = this.changeState.bind(this);
  }
  componentDidMount () {
    let user = this.props.user;
    let that = this;

    fetch(`/api/v1/user/${user.username}/events/ORGANIZER`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (events) {
        that.setState({ organizer: events });
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`/api/v1/user/${user.username}/events/STAFF`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (events) {
        that.setState({ staff: events });
      })
      .catch(function (error) {
        console.log(error);
      });
    fetch(`/api/v1/user/${user.username}/events/ATTENDENT`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (events) {
        that.setState({ attendent: events });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ loading: false });
  }

  changeState (e) {
    console.log(e.target.id);
    this.setState({ statePage: e.target.id });
  }

  render () {
    let myEvents;
    if (this.state.statePage === 'organizer') {
      myEvents = this.state.organizer.map((event, i) => (
        <MyEventBox key={i} event={event} />
      ));
    } else if (this.state.statePage === 'attendent') {
      myEvents = this.state.staff.map((event, i) => (
        <MyEventBox key={i} event={event} />
      ));
    } if (this.state.statePage === 'staff') {
      myEvents = this.state.attendent.map((event, i) => (
        <MyEventBox key={i} event={event} />
      ));
    }
    let organizerClass =
      this.state.statePage === 'organizer' ? 'my_events_active' : '';
    let attendentClass =
      this.state.statePage === 'attendent' ? 'my_events_active' : '';
    let staffClass = this.state.statePage === 'staff' ? 'my_events_active' : '';
    return (
      <div>
        <ProgressBar
          percent={this.state.loading ? 0 : 100}
          spinner={false}
          autoIncrement={true}
        />
        <Header />
        <div className="my_events_container_all">
          <div className="my_events_container_all_title">
            <p>رویداد های من:</p>
          </div>
          <div className="my_events_topbar">
            <button
              id="organizer"
              onClick={this.changeState}
              className={organizerClass}
            >
              <p onClick={this.changeState}> به عنوان ایجاد کننده </p>
            </button>
            <button
              id="attendent"
              onClick={this.changeState}
              className={attendentClass}
            >
              <p onClick={this.change}> به عنوان شرکت کننده </p>
            </button>
            <button
              id="staff"
              onClick={this.changeState}
              className={staffClass}
            >
              <p> به عنوان کمک کننده </p>
            </button>
          </div>
          <div className="my_events_container">{myEvents}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyEvents);

MyEvents.propTypes = {
  user: PropTypes.object.isRequired
};
