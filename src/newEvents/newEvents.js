import React from 'react';
import './newEvents.css';
import { Link } from 'react-router-dom';
import EventImage from '../images/event.png';

export class NewEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { title: "ICPC class" },
        { title: "DM Class" },
        { title: "AP Class" },
        { title: "Node class" }]
    }
  }

  componentDidMount() {
    //fetch all events
  }

  render() {
    return (
      <section>

      </section>
    );
  }
}
