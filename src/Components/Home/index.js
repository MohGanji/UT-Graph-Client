import React from 'react';
import { Header } from '../../Utils/Header';
import NewEvents from './NewEvents'
import { Slider } from './Slider'

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Slider />
        <NewEvents />
      </div>
    );
  }
}