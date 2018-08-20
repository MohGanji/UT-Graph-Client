import React from 'react';
import './login.css';
import { handleErrors } from '../../Utils/handleErrors';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated
  };
}

class Login extends React.Component {
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
    let that = this;

    fetch('/api/v1/user/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    }).then(handleErrors)
      .then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        localStorage.setItem('token', responseJson.data.token)
        that.props.dispatch({ type: 'AUTHENTICATE_THE_USER' });
      }).catch(function (error) {
        //TODO: toast 
      });
  }

  render() {
    return (
      <div class="login_page">
        <h1 class="login-title">Ut Graph</h1>
        <div class="login_form">
          <input type="text" class="login-input" placeholder="username" name="username" onChange={this.handleChange} required autofocus />
          <input type="password" class="login-input" placeholder="Password" name="password" onChange={this.handleChange} required />
          <input type="submit" value="ورود" class="login-button" onClick={this.handleSubmit} />
          <p class="login-lost">
            <a href=""> کلمه عبور خود را فراموش کرده اید؟ </a>
            /
            <a href=""> حساب کاربری ندارید؟ </a>
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
