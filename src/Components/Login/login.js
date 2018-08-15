import React from 'react';
import './login.css';
import { handleErrors } from '../../Utils/handleErrors';


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'username',
      password: 'password'
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

    fetch('/api/v1/login', {
      method: "POST",
      body: JSON.stringify({ data: data })
    }).then(handleErrors)
      .then(function (response) {
        //token
      }).catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div class="login_page">
        <h1 class="login-title">Ut Graph</h1>
        <div class="login_form">
          <input type="text" class="login-input" placeholder="username" name="username" onChange={this.handleChange} required autofocus />
          <input type="password" class="login-input" placeholder="Password" name=" password" onChange={this.handleChange} required />
          <input type="submit" value="Login" class="login-button" />
          <p class="login-lost">
            <a href="">Forgot Password? </a>
            /
            <a href=""> Don't have an account? Signup</a>
          </p>
        </div>
      </div>
    );
  }
}
