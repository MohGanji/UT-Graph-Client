import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Home } from './home';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
