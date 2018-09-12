import React from 'react';
import './style.css';
import Background from '../../../images/coverpic.svg';

export default class BackgroundCover extends React.Component {
  render () {
    return (
      <div className="background_cover">
        <img className="background_image" src={Background} />
      </div>
    );
  }
}
