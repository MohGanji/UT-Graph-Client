import React from 'react';
import { Header } from '../../Utils/Header';
import NewEvents from './NewEvents'
import { MySlider } from './Slider'
import './Home.css';
import EventBox from '../../Utils/EventBox';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
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
    const newEvents = this.state.events.map((event) =>
      <EventBox event={event} />
    );

    return (
      <div className="container">
        <Header />
        <MySlider />
        <div class="event_container">
          {newEvents}
        </div>
      </div>
    );
  }
}