import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default class CreateEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let text = target.getContent();
    this.props.handleText(text);
  }

  render() {
    return (
      <div>
        <Editor
          init={{
            plugins: 'link directionality lists',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | ltr rtl | numlist bullist | fontsizeselect',
            menubar: false,
            height: "250"
          }}
          onChange={this.handleChange}
          initialValue={this.props.text}
        />
        {/* look: {this.state.text} */}
      </div>
    );
  }
}