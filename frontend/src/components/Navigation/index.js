import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Navigation extends Component {
  render() {
    return (
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    )
  }
}

export default Navigation
