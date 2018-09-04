import React from 'react';
import './MyEvents.css';
import Header from '../../Utils/Header';
import Footer from '../../Utils/Footer';
import { connect } from 'react-redux'
import handleErrors from '../../Utils/functions/handleErrors'
import MyEventBox from './MyEventBox';

function mapStateToProps(state) {
  return {
    user: state.user,
    authenticated: state.authenticated,
  }
}

class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  componentDidMount() {
    let user = this.props.user;
    let that = this;

    fetch(`/api/v1/user/${user.username}/events`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (events) {
        that.setState({ events: events })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const myEvents = this.state.events.map((event) => <MyEventBox event={event} />)
    return (
      <div>
        <Header />
        <div class="my_events_container_all">
          <div class="my_events_container_all_title" >
            <p>رویداد های من:</p>
          </div>
          <div class="my_events_container">
            {myEvents}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps)(MyEvents);