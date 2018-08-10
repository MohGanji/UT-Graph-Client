import React from 'react';
import './Register.css';

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

  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
