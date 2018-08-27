import React from 'react';
import './EventSearch.css'
import { Header } from '../../Utils/Header';
import { handleErrors } from '../../Utils/handleErrors'
import EventBox from '../../Utils/EventBox'
import NewEvents from '../Home/NewEvents';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    let that = this;
    let keyword = this.props.match.params.keyword;

    fetch(`/api/v1/event/search/${keyword}`)
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        that.setState({ events: responseJson.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const searchEvents = this.state.events.map((event) => <EventBox event={event} />);
    return (
      <div>
        <Header />
        <div class="search_page_container">
          <div class="search_page_title">
            <p>نتیجه جستجو:</p>
          </div>
          <div class="home_new_events_container search_page_results_container">
            {searchEvents}
          </div>
        </div>
      </div>
    );
  }
}