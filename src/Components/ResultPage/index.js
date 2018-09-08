import React from 'react';
import './style.css'
import Header from '../../Utils/Header';
import handleErrors from '../../Utils/functions/handleErrors'
import EventBox from '../../Utils/EventBox'
import Footer from '../../Utils/Footer';
import UserBox from '../../Utils/UserBox';

export default class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      events: [],
      eventsType: 'old',
      pageToken: '',
      hasMore: false,
    }
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handlePaginationSubmit = this.handlePaginationSubmit.bind(this);
  }

  componentDidMount() {
    let that = this;
    let keyword = this.props.match.params.keyword;
    let type = this.props.type;
    let eventsType = this.state.eventsType;
    let restOfDomain;
    if (type === 'events') {
      restOfDomain = `event/get/${eventsType}`;
    }
    else if (type === 'user-search') {
      restOfDomain = `user/search/${keyword}`;
    }
    else if (type === 'event-search') {
      restOfDomain = `event/search/${keyword}`;
    }

    fetch(`/api/v1/${restOfDomain}`)
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        if (type === 'user-search') {
          that.setState({ users: responseJson.data })
        }
        else if (type === 'event-search') {
          that.setState({ events: responseJson.data })
        }
        else {
          let hasMore = responseJson.data.length === 8;
          that.setState({
            events: responseJson.data,
            pageToken: responseJson.pageToken,
            eventsType: eventsType,
            hasMore: hasMore
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleTypeChange() {
    let eventsType = this.state.eventsType;
    let that = this;
    eventsType = eventsType === 'new' ? 'old' : 'new';

    fetch(`/api/v1/event/get/${eventsType}`)
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        let hasMore = responseJson.data.length === 8;
        that.setState({
          events: responseJson.data,
          pageToken: responseJson.pageToken,
          eventsType: eventsType,
          hasMore: hasMore
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handlePaginationSubmit() {
    let that = this;
    let pageToken = this.state.pageToken;
    let eventsType = this.state.eventsType;

    fetch(`/api/v1/event/get/${eventsType}?pageToken="${pageToken}"`, {
      method: 'GET',
    })
      .then(function (response) {
        return response.json();
      })
      .then(handleErrors)
      .then(function (responseJson) {
        let previousEvents = that.state.events;
        let newEvents = responseJson.data;
        let events = previousEvents.concat(newEvents);
        let hasMore = (newEvents.length === 8);
        that.setState({
          events: events,
          pageToken: responseJson.pageToken,
          hasMore: hasMore
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const type = this.props.type;
    let resultItems, resultDialog;
    let changeTypeButton;

    if (type === 'user-search') {
      resultDialog = 'نتایج جستجو:';
      resultItems = this.state.users.map((user) => <UserBox user={user} />);
    }
    else if (type === 'event-search') {
      resultDialog = 'نتایج جستجو:';
      resultItems = this.state.events.map((event) => <EventBox event={event} />);
    }
    else if (type === 'events') {
      let eventsType = this.state.eventsType;
      resultDialog = eventsType === 'new' ? 'رویداد های در حال برگزاری:' : 'رویداد های قدیمی:';
      changeTypeButton = eventsType === 'new' ?
        <a class="load_more_button" onClick={this.handleTypeChange} >مشاهده رویداد های قدیمی</a> :
        <a class="load_more_button" onClick={this.handleTypeChange}>مشاهده رویداد های در حال برگزاری:</a>;
      resultItems = this.state.events.map((event) => <EventBox event={event} />);
    }

    return (
      <div>
        <Header />
        <div class="search_page_container">
          <div class="search_page_title">
            <p>{resultDialog}</p>
            {changeTypeButton}
          </div>
          <div class="home_new_events_container search_page_results_container">
            {resultItems}
          </div>
          <div class="load_more_events" hidden={!this.state.hasMore} >
            <a class="load_more_button" onClick={this.handlePaginationSubmit}>رویداد های بیشتر</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}