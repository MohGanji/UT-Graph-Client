import React from 'react';
import { Header } from './header/header';
import { NewEvents } from './newEvents/newEvents'

export class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <NewEvents />
      </div>
    );
  }
}