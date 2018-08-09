import React from 'react';
import './newEvents.css';
import { Link } from 'react-router-dom';
import EventImage from '../images/event.png';

export class NewEvents extends React.Component {
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
      });
  }

  render() {
    return (
      <section>
      </section>
    );
  }
}
