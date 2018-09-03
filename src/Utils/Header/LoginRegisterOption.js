import React from 'react'
import './nav.css'
import Popup from 'reactjs-popup'
import Login from '../../Components/Login/login'
import Register from '../../Components/Register/Register'
import 'react-toastify/dist/ReactToastify.css'


const contentStyle = {
  height: 'innerHeight',
  width: 'innerWidth',
  'z-index': '1',
  padding: '0px',
}

const inner_div = {
  background: '#000000cc',
  'z-index': '0',
}

export default class LoginRegisterOption extends React.Component {
  render() {
    return (
      <div class="login_logout_buttons not_logged_in">
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
    );
  }
}
