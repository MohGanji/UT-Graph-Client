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
      < div class="login_container" >
        <p class="login_text">ورود</p>
        <input class="login_input" type="text" placeholder="username" name="username" onChange={this.handleChange} required />
        <input class="login_input" type="password" placeholder="password" name=" password" onChange={this.handleChange} required />
        <br />
        <input class="login_button" type="submit" value="ورود"></input>
      </div >
    );
  }
}
