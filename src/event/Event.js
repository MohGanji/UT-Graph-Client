import React from 'react';
import './Event.css';
import { handleErrors } from '../functions/handleErrors';

export class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {}
    }
  }

  componentDidMount() {
    let that = this;
    const id = this.props.match.params.id;

    fetch(`/api/v1/event/${id}`)
      .then(handleErrors)
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJson) {
        return responseJson.data;
      })
      .then(function (info) {
        that.setState({ info: info })
      })
      .catch(function (error) {
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
