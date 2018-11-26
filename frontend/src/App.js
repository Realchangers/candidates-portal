import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import environment from './RelayEnvironment'
import './App.scss'

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            greeting(firstName: "Jeremy") {
              nickname
            }
          }
      `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error! {error}</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>User ID: {props.greeting}</div>;
        }}
      />
    );
  }
}

export default App
