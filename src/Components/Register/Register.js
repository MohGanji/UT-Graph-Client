import React from 'react';
import './Register.css';
import { handleErrors } from '../functions/handleErrors.js';

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username,
      password,
      fistName,
      lastName,
      email,
      sid
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

    fetch('/api/v1/register', {
      method: "POST",
      body: JSON.stringify({ data: data })
    })
      .then(handleErrors)
      .then(function (response) {
        //TODO: link to homepage
      })
      .catch(function (error) {
        console.log(error);
        //TODO: handle linking
      });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
