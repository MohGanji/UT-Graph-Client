import React from 'react';
import './style.css';
import handleErrors from '../../Utils/functions/handleErrors';
import Login from '../Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseForm from '../../Utils/BaseForm';
import 'font-awesome/css/font-awesome.min.css';

export default class Register extends BaseForm {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      sid: '',
      p_sid: '',
      is_registered: false,
      warnings: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistered = this.handleRegistered.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const data = this.state;
    let that = this;

    fetch('/api/v1/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    })
      .then(res => {
        if (res.status === 200) {
          that.setState({
            is_registered: true
          });
          toast.success('لینک فعال سازی به ایمیل شما فرستاده شد');
        }
        return res.json();
      })
      .then(handleErrors)
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRegistered () {
    this.setState({ is_registered: true });
  }

  render () {
    if (this.state.is_registered) {
      return (
        <div>
          <Login />
        </div>
      );
    } else {
      return (
        <div className="signup_page">
          <div className="login-title">ثبت نام</div>
          <form onSubmit={this.handleSubmit}>
            <div className="login_form">
              <div className="input_container">
                <input
                  type="text"
                  className={
                    this.state.warnings['username']
                      ? 'login-input input_error'
                      : 'login-input'
                  }
                  placeholder="نام کاربری"
                  name="username"
                  onChange={this.handleLanguageInput.bind(this, 'english')}
                  value={this.state.username}
                  required
                  autoFocus
                />
                <i className="fa fa-user-circle input_logo" />
                <p
                  style={
                    this.state.warnings['username']
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  className="input_info"
                >
                  <i className="fa fa-info-circle" /> توجه: کارکتر های مجاز:
                  حروف انگلیسی و اعداد و حروف _ , - , .
                </p>
              </div>
              <div className="input_container">
                <input
                  type="password"
                  className="login-input"
                  placeholder="رمز عبور"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  required
                />
                <i className="fa fa-unlock-alt" />
              </div>
              <div className="input_container">
                <input
                  type="text"
                  className={
                    this.state.warnings['firstName']
                      ? 'login-input input_error'
                      : 'login-input'
                  }
                  placeholder="نام"
                  name="firstName"
                  onChange={this.handleLanguageInput.bind(this, 'persian')}
                  value={this.state.firstName}
                  required
                />
                <i className="fa fa-user" />
                <p
                  style={
                    this.state.warnings['firstName']
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  className="input_info"
                >
                  <i className="fa fa-info-circle" /> لطفا نام خود را به فارسی
                  وارد کنید
                </p>
              </div>
              <div className="input_container">
                <input
                  type="text"
                  className={
                    this.state.warnings['lastName']
                      ? 'login-input input_error'
                      : 'login-input'
                  }
                  placeholder="نام خانوادگی"
                  name="lastName"
                  onChange={this.handleLanguageInput.bind(this, 'persian')}
                  value={this.state.lastName}
                  required
                />
                <i className="fa fa-user input_logo" />
                <p
                  style={
                    this.state.warnings['lastName']
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  className="input_info"
                >
                  <i className="fa fa-info-circle" /> لطفا نام خانوادگی خود را
                  به فارسی وارد کنید
                </p>
              </div>
              <div className="input_container">
                <input
                  type="email"
                  className="login-input"
                  placeholder="ایمیل"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                />
                <i className="fa fa-envelope-open" />
              </div>
              <div className="input_container">
                <input
                  type="text"
                  className={
                    this.state.warnings['sid']
                      ? 'login-input input_error'
                      : 'login-input'
                  }
                  placeholder="شماره دانشجویی"
                  name="sid"
                  onChange={this.handleNumberInput}
                  value={this.state.p_sid}
                  required
                />
                <i className="fa fa-graduation-cap" />
                <p
                  style={
                    this.state.warnings['sid']
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                  className="input_info"
                >
                  <i className="fa fa-info-circle" />
                  {' لطفا ورودی عددی وارد کنید '}
                </p>
              </div>
              <input type="submit" value="ثبت نام" className="login-button" />
              <p className="login-lost">
                <a onClick={this.handleRegistered}>
                  {' '}
                  حساب کاربری دارید؟ کلیک کنید{' '}
                </a>
              </p>
            </div>
          </form>
        </div>
      );
    }
  }
}
