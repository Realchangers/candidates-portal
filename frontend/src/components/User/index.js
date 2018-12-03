import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import environment from '../../RelayEnvironment'

class User extends Component {
  render() {
    const userName = "test@gmail.com";
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserQuery($userName: ID!) {
            user(userName: $userName) {
              firstName
              lastName
            }
          }
      `}
        variables={{ userName }}
        render={({ error, props }) => {
          if (error) {
            return <div>Error! {error}</div>
          }
          if (!props) {
            return <div>Loading...</div>
          }
          if (!props.user) {
            return <div>Unable to find user with username '{userName}'.</div>
          }
          return <div>Welcome {props.user.firstName} {props.user.lastName}</div>
        }}
      />
    );
  }
}

export default User
