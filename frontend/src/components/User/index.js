import React, { Component } from 'react'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      password: this.props.userDetails.password,
      newPassword: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    console.log(`Will send state to server: ${JSON.stringify(this.state)}`)
    event.preventDefault()
  }

  render() {
    const { userName, firstName, lastName } = this.props.userDetails
    return (
      <div>
        <div>Welcome {firstName} {lastName} ({userName})!</div>
        <form>
          <label>
            Current Password:
            <input type="text" value={this.state.password} onChange={this.handleInputChange} name="password" />
          </label>
          <label>
            New Password:
            <input type="text" value={this.state.newPassword} onChange={this.handleInputChange} name="newPassword" />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

export default createFragmentContainer(
  User,
  graphql`
    fragment User_userDetails on User {
      userName
      password
      firstName
      lastName
    }
  `
)
