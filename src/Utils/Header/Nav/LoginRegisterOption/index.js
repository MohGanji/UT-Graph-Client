import React from 'react';
import '../style.css';
import Popup from 'reactjs-popup';
import Login from '../../../../Components/Login/';
import Register from '../../../../Components/Register/';
import 'react-toastify/dist/ReactToastify.css';

const contentStyle = {
  height: 'innerHeight',
  width: 'innerWidth',
  'z-index': '1',
  padding: '0px'
};

const innerDiv = {
  background: '#000000cc',
  'z-index': '0'
};

export default class LoginRegisterOption extends React.Component {
  render () {
    return (
      <div className="login_logout_buttons not_logged_in">
        <Popup
          trigger={<a className="button">ورود</a>}
          modal
          contentStyle={contentStyle}
          overlayStyle={innerDiv}
        >
          {close => (
            <div>
              <span className="close" onClick={close}>
                &times;
              </span>
              <Login />
            </div>
          )}
        </Popup>
        <Popup
          trigger={<a className="button active">ثبت نام</a>}
          modal
          contentStyle={contentStyle}
          overlayStyle={innerDiv}
        >
          {close => (
            <div>
              <span className="close" onClick={close}>
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
