import React, { Component } from 'react'

class AuthenticationComponent extends Component {
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
                <input type="email" placeholder="user@example.com" />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <label>
                Password
                <input type="password" />
              </label>
            </div>
          </div>
          <div className="grid-x grid-padding-x">
            <div className="medium-6 cell">
              <button type="submit" className="button success">Login</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default AuthenticationComponent
