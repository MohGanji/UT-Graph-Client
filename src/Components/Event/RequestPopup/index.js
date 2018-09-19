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

export default class LoginPopup extends React.Component {
  constructor (props) {
    super(props);
    this.requestStaff = this.requestStaff.bind(this);
  }

  requestStaff () {
    const id = this.props.event._id;
    const token = localStorage.getItem('accessToken');

    fetch(`/api/v1/event/${id}/signup_staff`, {
      headers: {
        authorization: token
      },
      method: 'POST'
    });

    toast.info('درخواست شما برای ادمین رویداد ارسال شد');
  }

  render () {
    return (
      <Popup
        trigger={
          <button className="event_page_signup_button"> درخواست همکاری </button>
        }
        modal
        contentStyle={contentStyle}
        overlayStyle={innerDiv}
      >
        {close => (
          <div className="modal">
            <div className="modal_message">
              آیا تمایل دارید به عنوان <b> کمک کننده (staff) </b> در رویداد
              <b> {this.props.event.title} </b>
              مشارکت کنید؟
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
  }
}

LoginPopup.propTypes = {
  requestStaff: PropTypes.function,
  event: PropTypes.object
};
