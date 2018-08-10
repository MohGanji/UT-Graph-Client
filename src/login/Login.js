import React from 'react';
import './Login.css';
import { handleErrors } from '../function/handleErrors';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'username',
      password: 'password'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
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
      <div>
      </div>
    );
  }
}
