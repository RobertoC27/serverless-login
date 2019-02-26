import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Page <b>under construction</b>, wait for us...
          </p>
          
        <Signup />
        </header>
      </div>
    );
  }
}

export default App;
