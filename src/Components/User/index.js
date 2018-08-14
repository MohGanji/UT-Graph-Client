import React from 'react';
import './User.css';
import { handleErrors } from '../../Utils/handleErrors';
import { Header } from '../../Utils/Header';
import { BackgroundCover } from './Background_Cover'
import ProfilePhoto from '../../images/deafault-background.jpeg';
import NewEvents from '../Home/NewEvents'

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {}
    }
  }

  componentDidMount() {
    let that = this;
    const id = this.props.match.params.id;

    fetch(`/api/v1/user/${id}`)
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
        <Header />
        <BackgroundCover />
        <div class="user_info">
          <div class="profile_photo_container">
            <img class="profile_photo" src={ProfilePhoto} />
          </div>
          <div class="user_about">
            <p id="user_name" class="user_about_text"> آرمان رستمی </p>
            <p class="user_about_text"> دانشجوی مهندسی کامپیوتر دانشگاه تهران </p>
          </div>
        </div>
        <br />
        <NewEvents />
      </div >
    );
  }
}
