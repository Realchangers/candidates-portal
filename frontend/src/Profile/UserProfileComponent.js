import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import UserProfileMutation from './UserProfileMutation'

class UserProfileComponent extends Component {
  constructor(props) {
    super(props)

    this.state = { location: '' }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {

    let location = ''
    if (newProps.currentUser) {
      if (newProps.currentUser.profile) {
        location = newProps.currentUser.profile.location
      }
    }

    this.setState({
      location: location
    })
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
      <div className="medium-6 cell">
        <h3>Database profile</h3>
        <form>
          <label>
            Location:
            <input type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleInputChange}
              placeholder="Remotely" />
          </label>
          <p className="help-text">Tell us where would you like to ideally work.</p>
          <input type="submit" value="Save in DynamoDB" className="success button" onClick={this.handleSubmit} />
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
