import React from 'react';
import './OldEvent.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Icon } from 'semantic-ui-react'



export default class OldEventBox extends React.Component {

  render() {
    return (
      <a href="#">
        <div class="new_event">
          <Icon name="caret left" />
          {this.props.event.title}
        </div >
      </a>
    );
  }
}
