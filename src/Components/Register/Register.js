import React from 'react';
import './Register.css';
import { handleErrors } from '../../Utils/handleErrors.js';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fistName: "",
      lastName: "",
      email: "",
      sid: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    const data = this.state;

    fetch('/api/v1/user/register', {
      method: "POST",
      body: JSON.stringify({ data: data })
    })
      .then(handleErrors)
      .then(function (response) {
        //TODO: link to homepage
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
        //TODO: handle linking
      });
  }

  render() {
    return (
      <div class="signup_page">
        <h1 class="login-title">Ut Graph</h1>
        <div class="login_form">
          <input type="text" class="login-input" placeholder="username" name="username" onChange={this.handleChange} required autofocus />
          <input type="password" class="login-input" placeholder="Password" name=" password" onChange={this.handleChange} required />
          <input type="text" class="login-input" placeholder="First name" name="firstname" onChange={this.handleChange} required />
          <input type="text" class="login-input" placeholder="Last name" name="last" onChange={this.handleChange} required />
          <input type="email" class="login-input" placeholder="Email" name="email" onChange={this.handleChange} required />
          <input type="text" class="login-input" placeholder="Sid" name="sid" onChange={this.handleChange} required />

          <input type="submit" value="Signup" class="login-button" onClick={this.handleSubmit} />
          <p class="login-lost">
            <a href=""> Already have an account? Signup</a>
          </p>
        </div>
      </div>
    );
  }
}
