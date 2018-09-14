import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

export default class TextArea extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange (event) {
    let target = event.target;
    let text = target.getContent();
    this.props.handleText(text);
  }

  componentDidMount () {
    console.log('look', this.props.text);
  }
  render () {
    return (
      <div>
        <Editor
          init={{
            plugins: 'link directionality lists',
            toolbar:
              'undo redo | bold italic | alignleft aligncenter alignright | ltr rtl | numlist bullist | fontsizeselect',
            menubar: false,
            height: '250'
          }}
          onChange={this.handleTextChange}
          initialValue={this.props.text}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  handleText: PropTypes.func.isRequired,
  text: PropTypes.string
};
