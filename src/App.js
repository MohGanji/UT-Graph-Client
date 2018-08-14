import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import User from './Components/User'
import Event from './Components/Event';

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
