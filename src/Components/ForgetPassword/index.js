import React from 'react';
import './style.css';
import handleErrors from '../../Utils/functions/handleErrors';
import { toast } from 'react-toastify';
import BaseForm from '../../Utils/BaseForm';

export default class ForgetPassword extends BaseForm {
  constructor (props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit () {
    const data = this.state;

    fetch('/api/v1/user/reset-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    })
      .then(function (response) {
        toast.success('ایمیل بازیابی به ایمیل شما فرستاده شد');
        return response.json();
      })
      .then(handleErrors)
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    return (
      <div className="forget_page">
        <div className="login-title">بازیابی رمز عبور</div>
        <div className="login_form">
          <p className="forget_password_p">
            :برای دریافت ایمیل بازیابی رمز عبور ، لطفا آدرس ایمیل خود را وارد
            کنید
          </p>
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
          <input
            type="submit"
            value="ارسال"
            className="login-button"
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
