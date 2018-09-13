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
      is_registered: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
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
        }
        return res.json();
      })
      .then(handleErrors)
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    if (this.state.is_registered) {
      toast.success('شما با موفقیت ثبت نام شدید');
      return (
        <div>
          <Login />
        </div>
      );
    } else {
      return (
        <div className="signup_page">
          <div className="login-title">ثبت نام</div>
          <div className="login_form">
            <div className="input_container">
              <input
                type="text"
                className="login-input"
                placeholder="نام کاربری"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
                required
                autoFocus
              />
              <i className="fa fa-user" />
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
                className="login-input"
                placeholder="نام"
                name="firstName"
                onChange={this.handlePersianInput}
                value={this.state.firstName}
                required
              />
              <i className="fa fa-unlock-alt" />
            </div>
            <input
              type="text"
              className="login-input"
              placeholder="نام خانوادگی"
              name="lastName"
              onChange={this.handlePersianInput}
              value={this.state.lastName}
              required
            />
            <div className="input_container">
              <input
                type="email"
                className="login-input"
                placeholder="ایمیل"
                name="email"
                onChange={this.handleChange}
                value={this.state.value}
                required
              />
              <i className="fa fa-envelope-open" />
            </div>
            <div className="input_container">
              <input
                type="text"
                className="login-input"
                placeholder="شماره دانشجویی"
                name="sid"
                onChange={this.handleNumberInput}
                value={this.state.p_sid}
                required
              />
              <i className="fa fa-graduation-cap" />
            </div>
            <input
              type="submit"
              value="ثبت نام"
              className="login-button"
              onClick={this.handleSubmit}
            />
            <p className="login-lost">
              <a href=""> آیا حساب کاربری دارید؟ کلیک کنید</a>
            </p>
          </div>
        </div>
      );
    }
  }
}
