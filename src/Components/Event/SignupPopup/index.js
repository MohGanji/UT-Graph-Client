import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Login from '../../Login';

function mapStateToProps (state) {
  return {
    authenticated: state.authenticated
  };
}

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

class SignupPopup extends React.Component {
  constructor (props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register () {
    const id = this.props.event._id;
    const token = localStorage.getItem('accessToken');
    fetch(`/api/v1/event/${id}/signup_attendent`, {
      headers: {
        authorization: token
      },
      method: 'POST'
    });
    toast.success('ثبت نام شما در رویداد با موفقیت انجام شد');
  }

  render () {
    if (this.props.authenticated) {
      return (
        <Popup
          trigger={
            <button className="event_page_signup_button"> ثبت نام </button>
          }
          modal
          contentStyle={contentStyle}
          overlayStyle={innerDiv}
        >
          {close => (
            <form className="modal">
              <div className="modal_message">
                آیا تمایل دارید به عنوان <b> شرکت کننده </b> در رویداد
                <b> {this.props.event.title} </b>
                شرکت کنید؟
              </div>
              <div className="accept_request">
                <button
                  onClick={() => {
                    this.register();
                    close();
                  }}
                >
                  {' '}
                  <b> تایید </b>{' '}
                </button>
              </div>
            </form>
          )}
        </Popup>
      );
    } else {
      return (
        <Popup
          trigger={
            <button className="event_page_signup_button"> ثبت نام </button>
          }
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
      );
    }
  }
}

export default connect(mapStateToProps)(SignupPopup);

SignupPopup.propTypes = {
  register: PropTypes.function,
  event: PropTypes.object,
  authenticated: PropTypes.bool
};
