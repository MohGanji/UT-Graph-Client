import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

export default class TitleHolder extends React.Component {
  render () {
    return (
      <div className="title_holder_container">
        <div className="title_holder_container_image">
          <img src={this.props.image} />
        </div>
        <div className="title_holder_container_name">
          <p>{this.props.title}</p>
        </div>
      </div>
    );
  }
}

TitleHolder.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
