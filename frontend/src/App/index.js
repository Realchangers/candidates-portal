import React, { Component } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ProfilePage from '../Profile/ProfilePage'
import JobOffersPage from '../JobOffers/JobOffersPage'
import JobDetailPage from '../JobDetail/JobDetailPage'

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
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/job/:jobID" component={JobDetailPage} />
        </div >
      </Router>
    )
  }
}

export default withAuthenticator(App)
