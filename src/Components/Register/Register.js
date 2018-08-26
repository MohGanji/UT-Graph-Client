import React from 'react';
import './Register.css';
import { handleErrors } from '../../Utils/handleErrors.js';
import Login from '../Login/login'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fistName: "",
      lastName: "",
      email: "",
      sid: "",
      is_registered: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // toast("change!");
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const data = this.state;
    let that = this;
    fetch('/api/v1/user/register', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    })
      .then((res) => {
        if (res.status == 200)
          that.setState({
            is_registered: true
          });
        return res.json()
      })
      .then(handleErrors)
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.state.is_registered) {
      toast("شما با موفقیت ثبت نام شدید");
      return (
        <div>
          < Login />
        </div>
      );
    } else {
      return (
        <div class="signup_page" >
          <h1 class="login-title">Ut Graph</h1>
          <div class="login_form">
            <input type="text" class="login-input" placeholder="username" name="username" onChange={this.handleChange} value={this.state.username} required autofocus />
            <input type="password" class="login-input" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} required />
            <input type="text" class="login-input" placeholder="First name" name="firstName" onChange={this.handleChange} value={this.state.firstName} required />
            <input type="text" class="login-input" placeholder="Last name" name="lastName" onChange={this.handleChange} value={this.state.lastName} required />
            <input type="email" class="login-input" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.value} required />
            <input type="text" class="login-input" placeholder="Sid" name="sid" onChange={this.handleChange} value={this.state.sid} required />

            <input type="submit" value="ثبت نام" class="login-button" onClick={this.handleSubmit} />
            <p class="login-lost">
              <a href=""> آیا حساب کاربری دارید؟ کلیک کنید</a>
            </p>
          </div>
        </div>
      );
    }
  }
}
