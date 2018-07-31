import React, { Component } from 'react'
import './Navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="navbar-logo">
          <img className="rounded-img" src="https://picsum.photos/40/40" />
        </div>
        <div className="navbar-spacer"> </div>
        <div className="navbar-profile-pic">
          <img src="https://picsum.photos/40/40" />
        </div>
        {/* <div className=""> </div> */}
      </div>
    )
  }
}
