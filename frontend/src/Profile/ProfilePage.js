import React, { Component } from 'react'
import { QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import environment from '../RelayEnvironment'

import UserProfileComponent from './UserProfileComponent'
import AccountComponent from './AccountComponent';

class ProfilePage extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ProfilePageQuery {
            currentUser {
              ...UserProfileComponent_currentUser
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Unable to read profile. Error: {error.message}</div>
          }

          if (!props) {
            return <div>Loading...</div>
          }

          if (!props.currentUser) {
            return <div>Unable to find current user.</div>
          }

          return (
            <div>
              <h1>Profile</h1>
              <div className="grid-x">
                <AccountComponent />
                <UserProfileComponent currentUser={props.currentUser} />
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default ProfilePage
