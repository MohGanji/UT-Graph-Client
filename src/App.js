import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Home } from './home';
import { User } from './user/User.js';
import { Event } from './event/Event.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/event'} component={Event} />
          <Route path={'/user/:id'} component={User} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
