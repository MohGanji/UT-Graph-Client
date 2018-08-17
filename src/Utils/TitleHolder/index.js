import React from 'react';
import './TitleHolder.css'

export default class TitleHolder extends React.Component {

  render() {
    return (
      <div class="title_holder_container">
        <div class="title_holder_container_image">
          <img src={this.props.image} />
        </div>
        <div class="title_holder_container_name">
          <p>{this.props.title}</p>
        </div>
      </div>
    );
  }
}

