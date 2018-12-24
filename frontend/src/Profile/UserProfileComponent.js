import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import UserProfileMutation from './UserProfileMutation';

class UserProfileComponent extends Component {
  constructor(props) {
    super(props)

    let location = ''
    if (this.props.currentUser) {
      if (this.props.currentUser.profile) {
        location = this.props.currentUser.profile.location
      }
    }

    this.state = {
      location: location
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

    const location = this.state.location
    if (location === '') {
      return
    }

    UserProfileMutation.commit(
      this.props.relay.environment,
      location,
      (response) => this.setState({
        location: response.updateUserProfile.profile.location
      })
    )
  }

  render() {
    return (
      <div>
        <h2>User profile</h2>
        <form>
          <label>
            Location:
            <input type="text" value={this.state.location} onChange={this.handleInputChange} name="location" />
          </label>
          <input type="submit" value="Submit" className="hollow success button" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}

export default createFragmentContainer(
  UserProfileComponent,
  graphql`
    fragment UserProfileComponent_currentUser on User {
      profile {
        location
      }
    }
  `
)
