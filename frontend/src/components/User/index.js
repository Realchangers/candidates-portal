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
            user(id: "123") {
              userName
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
          if (props.user) {
            return <div>Nickname: {props.user.userName}</div>
          }
          return <div>Nickname: Unknown</div>
        }}
      />
    );
  }
}

export default User
