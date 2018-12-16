import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ProfilePage from './Profile/ProfilePage'
import JobOffersPage from './JobOffers/JobOffersPage';

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
          <Route path="/profile" component={ProfilePage} />
        </div >
      </Router >
    )
  }
}

export default App
