import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Login from '../../Login';
import BaseForm from '../../../Utils/BaseForm';

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

class RequestPopup extends BaseForm {
  constructor (props) {
    super(props);

    this.state = { job: '' };

    this.requestStaff = this.requestStaff.bind(this);
  }

  requestStaff () {
    const id = this.props.event._id;
    const token = localStorage.getItem('accessToken');
    const data = this.state;

    fetch(`/api/v1/event/${id}/signup_staff`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      method: 'POST',
      body: JSON.stringify({ data: data })
    });

    toast.info('درخواست شما برای ادمین رویداد ارسال شد');
  }

  render () {
    let requestButtonStyle;
    if (this.props.isAdmin) {
      requestButtonStyle = { display: 'none' };
    }
    if (this.props.authenticated) {
      return (
        <Popup
          trigger={
            <button
              style={requestButtonStyle}
              className="event_page_signup_button"
            >
              {' '}
              درخواست همکاری{' '}
            </button>
          }
          modal
          contentStyle={contentStyle}
          overlayStyle={innerDiv}
        >
          {close => (
            <div className="modal">
              <div className="modal_message">
                اگر تمایل دارید در رویداد <b> {this.props.event.title} </b> به
                عنوان همکار اضافه شوید لطفا نقش خود در رویداد را وارد کنید تا
                درخواست شما برای ادمین رویداد ارسال گردد
              </div>
              <div className="message_job">
                <div className="input_container">
                  <input
                    type="text"
                    className="login-input"
                    placeholder="نقش"
                    name="job"
                    value={this.state.job}
                    onChange={this.handleChange}
                    required
                    autoFocus
                  />
                  <i className="fa fa-users" />
                </div>
              </div>
              <div className="accept_request">
                <button
                  onClick={() => {
                    this.requestStaff();
                    close();
                  }}
                >
                  {' '}
                  <b> تایید </b>{' '}
                </button>
              </div>
            </div>
          )}
        </Popup>
      );
    } else {
      return (
        <Popup
          trigger={
            <button className="event_page_signup_button">
              {' '}
              درخواست همکاری{' '}
            </button>
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

export default connect(mapStateToProps)(RequestPopup);

RequestPopup.propTypes = {
  event: PropTypes.object,
  authenticated: PropTypes.bool,
  isRegistered: PropTypes.bool,
  isAdmin: PropTypes.bool
};
