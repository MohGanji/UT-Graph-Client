import React from 'react';
import Nav from './Nav/';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  render () {
    return (
      <header>
        <Nav type={this.props.type} />
      </header>
    );
  }
}

Header.propTypes = {
  type: PropTypes.string
};
