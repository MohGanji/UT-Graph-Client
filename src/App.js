import React, { Component } from 'react'
import logo from './logo.svg'
import Navbar from './Components/Utils/Navbar'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <hr className="Big-pro-pic-line"/> */}
        <p className="App-intro" />
      </div>
    )
  }
}

export default App
