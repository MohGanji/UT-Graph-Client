import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import Home from './Components/Home';
import User from './Components/User'
import Event from './Components/Event';
import CreateEvent from './Components/CreateEvent';
import EditProfile from './Components/EditProfile';
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
          <Route exact path="/edit-profile" render={() => (
            (this.props.authenticated) ? (<EditProfile />) : (<Redirect to="/" />)
          )} />
          <Route exact path="/create-event" render={() => (
            (this.props.authenticated) ? (<CreateEvent />) : (<Redirect to="/" />)
          )} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps)(App)
