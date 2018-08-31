import React from 'react'
import './nav.css'
import logo from '../../images/logo.svg'
import background from '../../images/background.jpg'
import SearchBar from './SearchBar'

import Popup from 'reactjs-popup'
import Login from '../../Components/Login/login'
import Register from '../../Components/Register/Register'
import LoggedInOption from './LoggedInOption'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { connect } from 'react-redux'
import LoginRegisterOption from './LoginRegisterOption';

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let rightElementOption
    if (this.props.authenticated) {
      rightElementOption =
        <div class="login_logout_buttons">
          <LoggedInOption />
        </div>
    } else {
      rightElementOption = (
        <LoginRegisterOption />
      )
    }
    return (
      <div>
        <div class="navbar">
          <a href={'/'}> <div class="logo_container"><img id="logoImage" src={logo} /></div> </a>
          <SearchBar />
          {rightElementOption}
        </div >
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} rtl />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav)
