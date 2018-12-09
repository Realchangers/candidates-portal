import React, { Component } from 'react'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

class User extends Component {
  render() {
    const { userName, firstName, lastName } = this.props.userDetails
    return (
      <div>Welcome {firstName} {lastName} ({userName})!</div>
    )
  }
}

export default createFragmentContainer(
  User,
  graphql`
    fragment User_userDetails on User {
      userName
      firstName
      lastName
    }
  `
)
