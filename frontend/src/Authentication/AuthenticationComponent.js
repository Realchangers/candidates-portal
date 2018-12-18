import React, { Component } from 'react'

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

class AuthenticationComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleHideMessage = this.handleHideMessage.bind(this)
  }

  render() {
    let callout = undefined
    if (this.state.cognitoResponse) {
      const stateClass = this.state.cognitoResponse.isError ? 'callout alert' : 'callout success'
      const responseMessage = this.state.cognitoResponse.message
      callout =
        <div className={stateClass}>
          <h5>Response from Cognito</h5>
          <p>{responseMessage}</p>
          <button className="close-button" aria-label="Dismiss alert" type="button" onClick={this.handleHideMessage}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    }

    return (
      <form>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <h1>Login</h1>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                Email
                <input type="email" placeholder="user@example.com" name="username"
                  value={this.state.username} onChange={this.handleInputChange} />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                Password
                <input type="password" name="password"
                  value={this.state.password} onChange={this.handleInputChange} />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              {callout}
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <button type="submit"
                className="button success"
                onClick={this.handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  handleHideMessage() {
    this.setState({
      cognitoResponse: undefined
    })
  }

  handleInputChange(event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  handleLogin(event) {
    event.preventDefault()

    const { username, password } = this.state
    if (!username || !password) {
      return
    }

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    })

    const userPool = new CognitoUserPool({
      UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session, userConfirmationNecessary) => {
        const accessToken = session.getAccessToken().getJwtToken()
        console.log(`Successfully logged in. JWT token is: ${accessToken}, userConfirmationNecessary: ${userConfirmationNecessary}`)
        this.setState({
          cognitoResponse: {
            isError: false,
            message: 'Successfully logged in!'
          }
        })
      },
      onFailure: (error) => {
        this.setState({
          cognitoResponse: {
            isError: true,
            message: `Unable to log in. Response from Cognito: ${error.message}`
          }
        })
      }
    })
  }
}

export default AuthenticationComponent
