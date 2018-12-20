import React, { Component } from 'react'

import UserProfileComponent from './UserProfileComponent';

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <UserProfileComponent />
      </div>
    )
  }
}

export default ProfilePage
