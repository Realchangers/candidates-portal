import React, { Component } from 'react'

class AuthenticationComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
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
    console.log(`Going to do login with username=${username}, password: ${password}`)
  }
}

export default AuthenticationComponent
