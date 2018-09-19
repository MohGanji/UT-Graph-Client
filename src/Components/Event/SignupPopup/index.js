import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';

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

export default class SignupPopup extends React.Component {
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
  }
}

SignupPopup.propTypes = {
  register: PropTypes.function,
  event: PropTypes.object
};
