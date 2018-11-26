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
            user(firstName: "Jeremy") {
              nickname
            }
          }
      `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error! {error}</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>Nickname: {props.user.nickname}</div>;
        }}
      />
    );
  }
}

export default User
