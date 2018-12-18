import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ProfilePage from '../Profile/ProfilePage'
import JobOffersPage from '../JobOffers/JobOffersPage';
import AuthenticationComponent from '../Authentication/AuthenticationComponent';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/offers">Job offers</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>

          <Route exact path="/" component={AuthenticationComponent} />
          <Route exact path="/offers" component={JobOffersPage} />
          <Route exact path="/profile" component={ProfilePage} />
        </div >
      </Router >
    )
  }
}

export default RouterComponent
