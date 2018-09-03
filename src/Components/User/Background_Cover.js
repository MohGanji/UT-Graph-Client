import React from 'react';
import './Background_Cover.css';
import Background from '../../images/coverpic.svg';

export class BackgroundCover extends React.Component {
  render() {
    return (
      <div class="background_cover">
        <img class="background_image" src={Background} />
      </div>
    );
  }
}
