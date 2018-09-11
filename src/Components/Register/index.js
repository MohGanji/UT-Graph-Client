import React from 'react'
import './style.css'
import handleErrors from '../../Utils/functions/handleErrors'
import Login from '../Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BaseForm from '../../Utils/BaseForm'

export default class Register extends BaseForm {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      sid: '',
      p_sid: '',
      is_registered: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const data = this.state
    let that = this
    fetch('/api/v1/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data }),
    })
      .then(res => {
        if (res.status == 200)
          that.setState({
            is_registered: true,
          })
        return res.json()
      })
      .then(handleErrors)
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    if (this.state.is_registered) {
      toast.success('شما با موفقیت ثبت نام شدید')
      return (
        <div>
          <Login />
        </div>
      )
    } else {
      return (
        <div class="signup_page">
          <h1 class="login-title">Ut Graph</h1>
          <div class="login_form">
            <input
              type="text"
              class="login-input"
              placeholder="نام کاربری"
              name="username"
              onChange={this.handleChange}
              value={this.state.username}
              required
              autofocus
            />
            <input
              type="password"
              class="login-input"
              placeholder="رمز عبور"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
            <input
              type="text"
              class="login-input"
              placeholder="نام"
              name="firstName"
              onChange={this.handlePersianInput}
              value={this.state.firstName}
              required
            />
            <input
              type="text"
              class="login-input"
              placeholder="نام خانوادگی"
              name="lastName"
              onChange={this.handlePersianInput}
              value={this.state.lastName}
              required
            />
            <input
              type="email"
              class="login-input"
              placeholder="ایمیل"
              name="email"
              onChange={this.handleChange}
              value={this.state.value}
              required
            />
            <input
              type="text"
              class="login-input"
              placeholder="شماره دانشجویی"
              name="sid"
              onChange={this.handleNumberInput}
              value={this.state.p_sid}
              required
            />

            <input
              type="submit"
              value="ثبت نام"
              class="login-button"
              onClick={this.handleSubmit}
            />
            <p class="login-lost">
              <a href=""> آیا حساب کاربری دارید؟ کلیک کنید</a>
            </p>
          </div>
        </div>
      )
    }
  }
}
