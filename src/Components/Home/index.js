import React from 'react';
import { Header } from '../../Utils/Header';
import NewEvents from './NewEvents'
import { MySlider } from './Slider'
import './Home.css';
import EventBox from '../../Utils/EventBox';
import OldEventBox from '../../Utils/OldEventBox';
import Login from '../Login/login';

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
      ]
    }
  }

  componentDidMount() {
    let that = this;

    fetch('/api/v1/event', {
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      }).then(function (events) {
        that.setState({ events: events });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const newEvents = this.state.events.map((event) => <EventBox event={event} />);
    const oldEvents = this.state.old_events.map((old_event) => <OldEventBox event={old_event} />);
    return (
      <div>
        <Header />
        <div class="home_slider">
          <MySlider events={this.state.events} />
        </div>

        <div class="home_new_events_title">
          <p> رویداد های تازه: </p>
        </div>
        <div class="home_new_events_container">
          {newEvents}
        </div>
        {/* {newEvents}
        </div>
        <div class="old_events">
          {oldEvents} */}
      </div>
    );
  }
}