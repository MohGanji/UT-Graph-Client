import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import User from './Components/User'
import Event from './Components/Event';
import CreateEvent from './Components/CreateEvent';
import EditProfile from './Components/EditProfile';
import NotFound from './Components/NotFound';
import MyEvents from './Components/MyEvents';
import ResultPage from './Components/ResultPage';
import Notification from './Components/Notification';
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
  }
}

class App extends Component {
  render() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' })
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/user/:id'} component={User} />
          <Route exact path={'/event/:id'} component={Event} />
          <Route exact path="/events" render={(props) => (
            <ResultPage type="events" {...props} />
          )} />
          <Route exact path="/search/event/:keyword" render={(props) => (
            <ResultPage type="event-search" {...props} />
          )} />
          <Route exact path="/search/user/:keyword" render={(props) => (
            <ResultPage type="user-search" {...props} />
          )} />
          <Route exact path="/edit-profile" render={() => (
            (this.props.authenticated) ? (<EditProfile />) : (<Redirect to="/" />)
          )} />
          <Route exact path="/create-event" render={() => (
            (this.props.authenticated) ? (<CreateEvent type="create" />) : (<Redirect to="/" />)
          )} />
          <Route exact path="/event/:id/edit" render={(props) => (
            (this.props.authenticated) ? (<CreateEvent type="edit" {...props} />) : (<Redirect to="/" />)
          )} />
          <Route exact path="/my-events" render={(props) => (
            (this.props.authenticated) ? (<MyEvents />) : (<Redirect to="/" />)
          )} />
          <Route exact path="/notification" render={(props) => (
            (this.props.authenticated) ? (<Notification />) : (<Redirect to="/" />)
          )} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps)(App)
