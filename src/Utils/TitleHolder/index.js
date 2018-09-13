import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

export default class TitleHolder extends React.Component {
  render () {
    let style = {};
    style.width =
      this.props.customWidth == null ? '100%' : this.props.customWidth;
    style.height =
      this.props.customHeight == null ? '30px' : this.props.customHeight;

    return (
      <div className="title_holder_container" style={style}>
        <div className="title_holder_container_image">
          <div
            className="title_holder_container_image_fill"
            style={{ width: style.height, height: style.height }}
          >
            <img src={this.props.image} alt="" />
          </div>
        </div>
        <div className="title_holder_container_name">
          <p>{this.props.title}</p>
        </div>
      </div>
    );
  }
}

TitleHolder.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  customHeight: PropTypes.string,
  customWidth: PropTypes.string
};
