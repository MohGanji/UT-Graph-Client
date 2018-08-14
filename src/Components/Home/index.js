import React from 'react';
import { Header } from '../../Utils/Header';
import NewEvents from './NewEvents'
import { Slider } from './Slider'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/event', {
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      }).then(function (events) {
        this.setState({ events: events });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Slider />
        <NewEvents />
      </div>
    );
  }
}