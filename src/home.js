import React from 'react';
import { Header } from './header/header';

export class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
}