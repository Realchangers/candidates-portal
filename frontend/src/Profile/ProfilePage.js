import React, { Component } from 'react'

import AccountComponent from './AccountComponent';

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <AccountComponent />
      </div>
    )
  }
}

export default ProfilePage
