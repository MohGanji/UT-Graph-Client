import React from 'react';
import PropTypes from 'prop-types';
import { store } from './Store';

export default class Auth extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.handleLocationChange();
    this.unlisten = this.context.router.history.listen(
      this.handleLocationChange
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleLocationChange() {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      store.dispatch({ type: 'AUTHENTICATE_THE_USER' });
    } else {
      store.dispatch({ type: 'DEAUTHENTICATE_THE_USER' });
    }
  }

  render() {
    return this.props.children;
  }
}
