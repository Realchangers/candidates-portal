import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import ProfileChangePasswordMutation from './ProfileChangePasswordMutation';

class ProfileComponent extends Component {
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

    const userName = this.props.userDetails.userName
    const currentPassword = this.state.password
    const newPassword = this.state.newPassword

    if (currentPassword === '' || newPassword === '') {
      return
    }

    ProfileChangePasswordMutation.commit(
      this.props.relay.environment,
      currentPassword,
      newPassword,
      userName,
      (response) => this.setState({
        password: response.changeUserPassword.user.password,
        newPassword: ''
      })
    )
  }

  render() {
    const { firstName, lastName } = this.props.userDetails
    return (
      <div>
        <h1>{firstName} {lastName}</h1>
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
  ProfileComponent,
  graphql`
    fragment ProfileComponent_userDetails on User {
      userName
      password
      firstName
      lastName
    }
  `
)