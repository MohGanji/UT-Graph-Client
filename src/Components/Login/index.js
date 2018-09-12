import React from 'react'
import './style.css'
import handleErrors from '../../Utils/functions/handleErrors'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import BaseForm from '../../Utils/BaseForm'

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user,
  }
}

class Login extends BaseForm {
  constructor(props) {
    super(props)

    this.state = {
      username: 'username',
      password: 'password',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const data = this.state
    let that = this

    fetch('/api/v1/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data }),
    })
      .then(function(response) {
        return response.json()
      })
      .then(handleErrors)
      .then(function(responseJson) {
        localStorage.setItem('token', responseJson.data.token)
        that.props.dispatch({ type: 'AUTHENTICATE_THE_USER' })
        return fetch(`/api/v1/user/${data.username}`)
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(responseJson) {
        that.props.dispatch({ type: 'SET_USER', user: responseJson.data })
      })
      .then(function() {
        toast.info('شما با موفقیت وارد شدید')
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div class="login_page">
        <h1 class="login-title">Ut Graph</h1>
        <div class="login_form">
          <input
            type="text"
            class="login-input"
            placeholder="نام کاربری"
            name="username"
            onChange={this.handleChange}
            required
            autofocus
          />
          <input
            type="password"
            class="login-input"
            placeholder="رمز عبور"
            name="password"
            onChange={this.handleChange}
            required
          />
          <input
            type="submit"
            value="ورود"
            class="login-button"
            onClick={this.handleSubmit}
          />
          <p class="login-lost">
            <a href=""> کلمه عبور خود را فراموش کرده اید؟ </a>/
            <a href=""> حساب کاربری ندارید؟ </a>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)