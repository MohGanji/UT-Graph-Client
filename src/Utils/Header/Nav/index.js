import React from 'react';
import './style.css';
import logo from '../../../images/logo.svg';
import SearchBar from './SearchBar/';
import LoggedInOption from './LoggedInOption/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import LoginRegisterOption from './LoginRegisterOption/';
import PropTypes from 'prop-types';

function mapStateToProps (state) {
  return {
    authenticated: state.authenticated,
    user: state.user
  };
}

class Nav extends React.Component {
  render () {
    let rightElementOption;
    if (this.props.authenticated) {
      rightElementOption = (
        <div className="login_logout_buttons">
          <LoggedInOption />
        </div>
      );
    } else {
      rightElementOption = <LoginRegisterOption />;
    }
    return (
      <div>
        <div className="navbar">
          <a href={'/'}>
            {' '}
            <div className="logo_container">
              <img id="logoImage" src={logo} alt="logo" />
            </div>{' '}
          </a>
          <SearchBar />
          {rightElementOption}
        </div>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} rtl />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav);

Nav.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
