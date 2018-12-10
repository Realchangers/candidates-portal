import React, { Component } from 'react'
import UserProfile from './containers/UserProfile'
import './App.scss'
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div className="grid-container">
        <Navigation />
        <UserProfile />
      </div>
    )
  }
}

export default App
