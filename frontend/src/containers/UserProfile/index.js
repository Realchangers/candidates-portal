import React, { Component } from 'react'

import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro'

import environment from '../../RelayEnvironment'
import User from '../../components/User';

class UserProfile extends Component {
  render() {
    const userName = "test@gmail.com";
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserProfileQuery($userName: ID!) {
            user(userName: $userName) {
              ...User_userDetails
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

          return <User userDetails={props.user} />
        }}
      />
    );
  }
}

export default UserProfile
