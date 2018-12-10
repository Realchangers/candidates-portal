import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.scss'

import Navigation from './components/Navigation';
import UserProfile from './containers/UserProfile'
import JobOffersPage from './containers/JobOffersPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <Navigation />

          <Route exact path="/" component={JobOffersPage} />
          <Route path="/profile" component={UserProfile} />
        </div >
      </Router >
    )
  }
}

export default App
