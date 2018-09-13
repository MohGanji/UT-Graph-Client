import React from 'react';
import Header from '../../Utils/Header';
import './style.css';
import EventBox from '../../Utils/EventBox';
import OldEventBox from '../../Utils/OldEventBox';
import handleErrors from '../../Utils/functions/handleErrors';
import OldEventSlider from './OldEventSlider/';
import Footer from '../../Utils/Footer';

export default class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      newEvents: [],
      oldEvents: [],
      pageToken: '',
      hasMore: false
    };
    this.handlePaginationSubmit = this.handlePaginationSubmit.bind(this);
  }

  componentDidMount () {
    let that = this;
    fetch(`/api/v1/event/get/new`, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        let hasMore = responseJson.data.length === 8;
        that.setState({
          newEvents: responseJson.data,
          pageToken: responseJson.pageToken,
          hasMore: hasMore
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch(`/api/v1/event/get/old`, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        that.setState({
          oldEvents: responseJson.data,
          pageToken: responseJson.pageToken
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handlePaginationSubmit () {
    let that = this;
    let pageToken = this.state.pageToken;
    fetch(`/api/v1/event/get/new?pageToken="${pageToken}"`, {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        let previousEvents = that.state.newEvents;
        let newEvents = responseJson.data;
        let hasMore = newEvents.length === 8;
        let events = previousEvents.concat(newEvents);
        that.setState({
          newEvents: events,
          pageToken: responseJson.pageToken,
          hasMore: hasMore
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    const newEvents = this.state.newEvents.map((event, i) => (
      <OldEventBox key={i} event={event} />
    ));
    const oldEvents = this.state.oldEvents.map((oldEvent, i) => (
      <OldEventBox key={i} event={oldEvent} />
    ));
    return (
      <div>
        <Header />
        <div className="welcome_home">
          <div className="centered">به UT Graph خوش آمدید!</div>
        </div>
        <div className="home_page_events_container search_page_container">
          <div className="search_page_title">
            <p> رویداد های در حال برگزاری: </p>
          </div>
          <div className="home_new_events_container">{newEvents}</div>
          <div className="load_more_events" hidden={!this.state.hasMore}>
            <a
              className="load_more_button"
              onClick={this.handlePaginationSubmit}
            >
              رویداد های بیشتر
            </a>
          </div>
        </div>
        <div className="home_slider_old_events">
          <OldEventSlider events={oldEvents} />
        </div>
        <Footer />
      </div>
    );
  }
}
