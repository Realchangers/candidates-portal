import React, { Component } from 'react'
import { Auth } from 'aws-amplify'

class AccountComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      given_name: '',
      family_name: '',
      email: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleHideMessage = this.handleHideMessage.bind(this)
    this.updateUserAttributes = this.updateUserAttributes.bind(this)
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .catch(error => this.setState({
        cognitoResponse: {
          isError: true,
          message: `Unable to read your profile. Error: ${error.message}`
        }
      }))
      .then(user => user.getUserAttributes((error, result) => {

        if (error) {
          this.setState({
            cognitoResponse: {
              isError: true,
              message: error.message
            }
          })
          return
        }

        let state = {}
        const attributeNames = ['given_name', 'family_name', 'email']

        for (const attribute of result) {
          if (attributeNames.includes(attribute.Name)) {
            state[attribute.Name] = attribute.Value
          }
        }

        this.setState(state)
      }))
  }

  render() {
    let callout = undefined
    if (this.state.cognitoResponse) {

      const { isError, message } = this.state.cognitoResponse

      const heading = isError ? 'Error response from Cognito' : 'Success response from Cognito'
      const stateClass = isError ? 'callout alert' : 'callout success'

      callout =
        <div className={stateClass}>
          <h5>{heading}</h5>
          <p>{message}</p>
          <button className="close-button" aria-label="Dismiss alert" type="button" onClick={this.handleHideMessage}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    }

    return (
      <div className="medium-6 cell">
        <h3>Cognito profile</h3>
        <form>
          <div className="grid-x">
            <div className="medium-10 cell">
              <label>
                Given name
                <input type="text" name="given_name" placeholder="John" autoComplete="first-name"
                  value={this.state.given_name} onChange={this.handleInputChange} />
              </label>
            </div>
          </div>
          <div className="grid-x">
            <div className="medium-10 cell">
              <label>
                Family name
                <input type="text" name="family_name" placeholder="Doe" autoComplete="family-name"
                  value={this.state.family_name} onChange={this.handleInputChange} />
              </label>
            </div>
          </div>
          <div className="grid-x">
            <div className="medium-10 cell">
              <label>
                Email
                <input type="text" name="email" placeholder="john@doe.com" autoComplete="email"
                  value={this.state.email} onChange={this.handleInputChange} />
              </label>
            </div>
          </div>
          <div className="grid-x">
            <div className="medium-10 cell">
              {callout}
            </div>
          </div>
          <div className="grid-x">
            <div className="medium-10 cell">
              <button type="submit"
                className="button success"
                onClick={this.handleLogin}>
                Save in Cognito
              </button>
            </div>
          </div>
        </form>
      </div>
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

    const { given_name, family_name, email } = this.state
    if (!given_name || !family_name || !email) {
      return
    }

    Auth.currentAuthenticatedUser()
      .then(user => this.updateUserAttributes(user, given_name, family_name, email))
      .then(() => this.setState({
        cognitoResponse: { isError: false, message: 'Your profile has been updated.' }
      }))
      .catch(error => this.setState({
        cognitoResponse: { isError: true, message: error.message }
      }))
  }

  updateUserAttributes(user, given_name, family_name, email) {
    return new Promise((resolve, reject) => {
      const attributes = [
        { Name: 'given_name', Value: given_name },
        { Name: 'family_name', Value: family_name },
        { Name: 'email', Value: email }
      ]

      user.updateAttributes(attributes, (error, response) => {
        if (error) {
          reject(error)
        }
        else {
          resolve(response)
        }
      })
    })
  }
}

export default AccountComponent
