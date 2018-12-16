import React, { Component } from 'react'

import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro'

import environment from '../RelayEnvironment'
import ProfileComponent from './ProfileComponent';

class ProfilePage extends Component {
  render() {
    const userName = "test@gmail.com";
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ProfilePageQuery($userName: ID!) {
            user(userName: $userName) {
              ...ProfileComponent_userDetails
            }
          }
        `}
        variables={{ userName }}
        render={({ error, props }) => {
          if (error) {
            return <div>Unable to read data. Error: {error.message}</div>
          }

          if (!props) {
            return <div>Loading...</div>
          }

          if (!props.user) {
            return <div>Unable to find user with email: '{userName}'</div>
          }

          return <ProfileComponent userDetails={props.user} />
        }}
      />
    );
  }
}

export default ProfilePage
