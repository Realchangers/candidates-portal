import React, { Component } from 'react'

import { QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import environment from '../RelayEnvironment'
import JobOfferList from './JobOfferList'

class JobOffersPage extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query JobOffersPageQuery {
            currentUser {
              ...JobOfferList_currentUser
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Unable to read data. Error: {error.message}</div>
          }

          if (!props) {
            return <div>Loading...</div>
          }

          return (
            <section>
              <h1>Your current job offers</h1>
              <JobOfferList currentUser={props.currentUser} />
            </section>
          )
        }}
      />
    )
  }
}

export default JobOffersPage
