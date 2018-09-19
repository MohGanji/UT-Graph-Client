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
      events: []
    };
  }
  componentDidMount () {
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
        that.setState({ events: events });
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ loading: false });
  }
  render () {
    const myEvents = this.state.events.map((event, i) => (
      <MyEventBox key={i} event={event} />
    ));
    return (
      <div className="container">
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
