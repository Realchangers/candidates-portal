import React, { Component } from 'react'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import ChangePasswordMutation from './ChangePasswordMutation';

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
    event.preventDefault()

    ChangePasswordMutation.commit(
      this.props.relay.environment,
      this.state.newPassword,
      this.props.userDetails,
      (response) => this.setState({
        password: response.changeUserPassword.user.password,
        newPassword: ''
      })
    )
  }

  render() {
    const { userName, firstName, lastName } = this.props.userDetails
    return (
      <div>
        <h2>Welcome {firstName} {lastName} ({userName})!</h2>
        <form>
          <label>
            Current Password:
            <input type="text" value={this.state.password} onChange={this.handleInputChange} name="password" />
          </label>
          <label>
            New Password:
            <input type="text" value={this.state.newPassword} onChange={this.handleInputChange} name="newPassword" />
          </label>
          <input type="submit" value="Submit" className="hollow success button" onClick={this.handleSubmit} />
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
