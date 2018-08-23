import React from 'react'
import './nav.css'
import logo from '../../images/logo.png'
import background from '../../images/background.jpg'
import SearchBar from './SearchBar'

import Popup from 'reactjs-popup'
import Login from '../../Components/Login/login'
import Register from '../../Components/Register/Register'
import LoggedInOption from './LoggedInOption'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  }
}

const contentStyle = {
  height: 'innerHeight',
  width: 'innerWidth',
  'z-index': '1',
  padding: '0px',
  // ,
  // display: flex
}

const inner_div = {
  // opacity: "0.2",
  background: '#000000cc',
  'z-index': '0',
}

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.dispatch({ type: 'DEAUTHENTICATE_THE_USER' })
  }

  render() {
    let rightElementOption
    if (!this.props.authenticated) {
      rightElementOption = <LoggedInOption />
    } else {
      rightElementOption = (
        <ul>
          <li class="rightElement">
            <Popup
              trigger={
                <a class="navbar_a" href="#">
                  ورود
                </a>
              }
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              {close => (
                <div>
                  <span class="close" onClick={close}>
                    &times;
                  </span>
                  <Login />
                </div>
              )}
            </Popup>
          </li>
          <li class="active">
            <Popup
              trigger={
                <a class="navbar_a" href="#">
                  ثبت نام
                </a>
              }
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              {close => (
                <div>
                  <span class="close" onClick={close}>
                    &times;
                  </span>
                  <Register />
                </div>
              )}
            </Popup>
          </li>
        </ul>
      )
    }
    return (
      <div class="navbar">
        <ul>
          <li>
            <a class="navbar_a" id="logoLink" href={'/'}>
              {' '}
              <img id="logoImage" src={logo} />
            </a>
          </li>
          <li class="navbar_search">
            {' '}
            <SearchBar />
          </li>

          {rightElementOption}
        </ul>
        <ToastContainer />
      </div>
    )
    if (this.props.authenticated) {
      return (
        <div>
          <button onClick={this.handleSubmit}>Logout</button>
          hello {this.props.user.username}
        </div>
      )
    }
    return (
      <div>
        <div class="navbar">
          <a href={'/'}> <div class="logo_container"><img id="logoImage" src={logo} /></div> </a>
          <SearchBar />
          <div class="login_logout_buttons">
            <Popup trigger={
              <a class="button" href="#">
                ورود
              </a>}
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              {close => (
                <div>
                  <span class="close" onClick={close}>
                    &times;
                  </span>
                  <Login />
                </div>
              )}
            </Popup>
            <Popup trigger={
              <a class="button active" href="#">
                ثبت نام
              </a>}
              modal
              contentStyle={contentStyle}
              overlayStyle={inner_div}
            >
              {close => (
                <div>
                  <span class="close" onClick={close}>
                    &times;
                  </span>
                  <Register />
                </div>
              )}
            </Popup>
          </div>
        </div >
        <ToastContainer class="my_toast" />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav)
