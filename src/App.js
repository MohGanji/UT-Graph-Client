import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './Components/Home';
import User from './Components/User'
import Event from './Components/Event';
import reducer from './Utils/Auth/reducer'

const store = createStore(reducer);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: 'AUTHENTICATE_THE_USER' });
}

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/user/:id'} component={User} />
            <Route exact path={'/event/:id'} component={Event} />
          </Switch>
        </BrowserRouter>
      </Provider >
    )
  }
}

export default App
