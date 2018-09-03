import React from 'react';
import { Header } from '../../Utils/Header';
import NewEvents from './NewEvents'
import { MySlider } from './Slider'
import './Home.css';
import EventBox from '../../Utils/EventBox';
import OldEventBox from './OldEventBox';
import Login from '../Login/login';
import skyImage from '../../images/sky.jpg'
import { handleErrors } from '../../Utils/handleErrors.js';
import OldEventSlider from './OldEventSlider';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [{ title: 1233 }, { title: 12434 }, { title: 12332123 },
      { title: 1233 }, { title: 1233 }, { title: "1233" }
      ],
      old_events: [
        { title: "همایشی که حجت سال ۹۶ برگزار کرد" },
        { title: "همایشی که حجت سال ۹۶ برگزار کرد" },
        { title: "همایشی که حجت سال ۹۶ برگزار کرد" },
        { title: "همایشی که حجت سال ۹۶ برگزار کرد" },
        { title: "همایشی که حجت سال ۹۶ برگزار کرد" }
      ],
      pageToken: ''
    }
    this.handlePaginationSubmit = this.handlePaginationSubmit.bind(this);
  }

  componentDidMount() {
    let that = this;
    fetch(`/api/v1/event/`, {
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        that.setState({ events: responseJson.data, pageToken: responseJson.pageToken })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handlePaginationSubmit() {
    let that = this;
    let pageToken = this.state.pageToken;
    fetch(`/api/v1/event/?pageToken="${pageToken}"`, {
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        let previousEvents = that.state.events; //async okay?
        let newEvents = responseJson.data;
        let events = previousEvents.concat(newEvents);
        that.setState({
          events: events,
          pageToken: responseJson.pageToken
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const newEvents = this.state.events.map((event) => <EventBox event={event} />);
    const oldEvents = this.state.events.map((old_event) => <OldEventBox event={old_event} />);
    return (
      <div>
        <Header />
        <div class="test">
          {/* <img src={skyImage} /> */}
          <div class="centered">به UT Graph خوش آمدید!</div>
        </div>
        {/* <div class="home_slider">
          <MySlider events={this.state.events} />
        </div> */}
        <OldEventSlider events={oldEvents} />

        <div class="home_new_events_container">
          <div class="home_new_events_title">
            <p> رویداد های در حال برگزاری: </p>
          </div>
          {newEvents}
          <div class="load_more_events">
            <a class="load_more_button" onClick={this.handlePaginationSubmit}>رویداد های بیشتر</a>
          </div>
        </div>

        {/* <OldEventBox /> */}
        {/* {newEvents}
        </div>
        <div class="old_events">
          {oldEvents} */}
        {/* <OldEventBox events={newEvents} /> */}
      </div>
    );
  }
}