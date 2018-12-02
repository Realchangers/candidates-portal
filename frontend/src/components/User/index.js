import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import environment from '../../RelayEnvironment'

class User extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserQuery {
            user(userName: "test@gmail.com") {
              firstName
              lastName
            }
          }
      `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error! {error}</div>
          }
          if (!props) {
            return <div>Loading...</div>
          }
          if (!props.user) {
            return <div>Unable to find user with username 'test@gmail.com'.</div>
          }
          return <div>Welcome {props.user.firstName} {props.user.lastName}</div>
        }}
      />
    );
  }
}

export default User
