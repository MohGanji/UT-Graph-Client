import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Utils/Header';
import Footer from '../../Utils/Footer';
import Login from '../Login';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import './style.css';

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

class EmailValidation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      success: true,
      pushedLogin: false
    };
    this.handleLoginButton = this.handleLoginButton.bind(this);
  }

  componentDidMount () {
    if (this.props.authenticated) {
      return;
    }
    const hash = this.props.match.params.hash;
    let that = this;
    fetch(`/api/v1/user/email-validation/${hash}`)
      .then(function (response) {
        if (response.ok) {
          that.setState({ success: true });
        } else {
          that.setState({ success: false });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleLoginButton () {
    this.setState({ pushedLogin: true });
  }

  render () {
    let message;

    if (this.props.authenticated) {
      message = (
        <div className="email-validation">
          <p id="validation_p">حساب کاربری شما قبلا فعال شده است!</p>
        </div>
      );
    } else if (this.state.success) {
      message = (
        <div className="email-validation">
          <p id="validation_p">حساب کاربری شما با موفقیت فعال شد!</p>{' '}
          <Popup
            trigger={<button className="event_page_signup_button">ورود</button>}
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
        </div>
      );
    } else {
      message = (
        <div className="email-validation">
          {' '}
          <p id="validation_p">
            متاسفانه خطایی در فعال سازی حساب کاربری شما به وجود آمده!
          </p>
        </div>
      );
    }

    if (this.state.pushedLogin) {
      return <Login />;
    }

    return (
      <div className="container">
        <Header />
        {message}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(EmailValidation);

EmailValidation.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      hash: PropTypes.string.isRequired
    })
  }),
  authenticated: PropTypes.bool
};
