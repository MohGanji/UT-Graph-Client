import React from 'react';
import './style.css';
import Background from '../../../images/coverpic.svg';

export default class BackgroundCover extends React.Component {
  render() {
    return (
      <div class="background_cover">
        <img class="background_image" src={Background} />
      </div>
    );
  }
}