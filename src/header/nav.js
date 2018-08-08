import React from 'react';
import './nav.css';
import logo from '../images/logo.png';

export class Nav extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><a id='logoLink' href={'/'}> <img id='logoImage' src={logo} /></a></li>
        </ul>
      </div>
    );
  }
}