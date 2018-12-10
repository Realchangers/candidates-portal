import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import UserProfile from './containers/UserProfile'
import JobOffersPage from './containers/JobOffersPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>

          <Route exact path="/" component={JobOffersPage} />
          <Route path="/profile" component={UserProfile} />
        </div >
      </Router >
    )
  }
}

export default App
