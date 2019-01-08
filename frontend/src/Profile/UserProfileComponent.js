import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import UserProfileMutation from './UserProfileMutation'

class UserProfileComponent extends Component {
  constructor(props) {
    super(props)

    // reads initial state from props, if provided (by Storybook)
    this.state = { location: this._locationFromProps(props) }

    this.handleInputChange = this._handleInputChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  // component starts with empty props and then it receives props later
  // (so it basically receives props 2 times)
  componentWillReceiveProps(newProps) {
    this.setState({
      location: this._locationFromProps(newProps)
    })
  }

  _locationFromProps(props) {
    if (props.currentUser) {
      if (props.currentUser.profile) {
        return props.currentUser.profile.location
      }
    }
    return ''
  }

  _handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  _handleSubmit(event) {
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
              onChange={this._handleInputChange}
              placeholder="Remotely" />
          </label>
          <p className="help-text">Tell us where would you like to ideally work.</p>
          <input type="submit" value="Save in DynamoDB" className="success button" onClick={this._handleSubmit} />
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
