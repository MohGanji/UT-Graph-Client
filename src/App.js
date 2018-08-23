import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import Home from './Components/Home';
import User from './Components/User'
import Event from './Components/Event';
import CreateEvent from './Components/CreateEvent';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/user/:id'} component={User} />
          <Route exact path={'/event/:id'} component={Event} />
          <Route exact path={'/create-event'} component={CreateEvent} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
