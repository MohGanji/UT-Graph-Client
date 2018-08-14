import React from 'react';
import './newEvents.css';
import { Link } from 'react-router-dom';
import EventImage from '../../images/event.jpg';


export default class NewEvents extends React.Component {
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
      <div class="events">
        <div class="events_container">
          {/* <div class="events_row"> */}
          <div class="event">
            <div class="event_img">
              <a href="#"> <img class="img_fill_div" src={EventImage} /> </a>
            </div>
            <a href="#">  <div class="event_info">
              <div class="event_title">
                ایونتی که حجت برگزار میکند
              </div>
              <div class="event_date">
                <span>  امیرآباد </span>
                |
                <span> یکشنبه ۲۱ آذر </span>
              </div>
            </div></a>
          </div>
          <div class="event">
            <div class="event_img">
              <a href="#"> <img class="img_fill_div" src={EventImage} /> </a>
            </div>
            <a href="#">  <div class="event_info">
              این یک ایونت است. هادی حجت برگزاری آن را بر عهده دارد. یکشنبه صبح ساعت ۱۰.
              </div></a>
          </div>
          <div class="event">
            <div class="event_img">
              <a href="#"> <img class="img_fill_div" src={EventImage} /> </a>
            </div>
            <a href="#">  <div class="event_info">
              این یک ایونت است. هادی حجت برگزاری آن را بر عهده دارد. یکشنبه صبح ساعت ۱۰.
              </div></a>
          </div>
          <div class="event">
            <div class="event_img">
              <a href="#"> <img class="img_fill_div" src={EventImage} /> </a>
            </div>
            <a href="#">  <div class="event_info">
              این یک ایونت است. هادی حجت برگزاری آن را بر عهده دارد. یکشنبه صبح ساعت ۱۰.
              </div></a>
          </div>
          <div class="event">
            <div class="event_img">
              <a href="#"> <img class="img_fill_div" src={EventImage} /> </a>
            </div>
            <a href="#">  <div class="event_info">
              این یک ایونت است. هادی حجت برگزاری آن را بر عهده دارد. یکشنبه صبح ساعت ۱۰.
              </div></a>
          </div>
          <div class="event">
            <div class="event_img">
              <a href="#"> <img class="img_fill_div" src={EventImage} /> </a>
            </div>
            <a href="#">  <div class="event_info">
              این یک ایونت است. هادی حجت برگزاری آن را بر عهده دارد. یکشنبه صبح ساعت ۱۰.
              </div></a>
          </div>
          {/* </div> */}

        </div>
        <div class="old_events">
        </div>
      </div>
    );
  }
}
