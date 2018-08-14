import React from 'react';
import './Background_Cover.css';
import { handleErrors } from '../../Utils/handleErrors';
import Background from '../../images/cover.jpg';

export class BackgroundCover extends React.Component {
  render() {
    return (
      <div class="background_cover">
        <img class="background_image" src={Background} />
      </div>
    );
  }
}
