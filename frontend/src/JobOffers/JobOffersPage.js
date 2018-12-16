import React, { Component } from 'react'

import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro'

import environment from '../RelayEnvironment'
import JobOfferList from './JobOfferList'

class JobOffersPage extends Component {
  render() {
    const userName = "test@gmail.com";
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query JobOffersPageQuery($userName: ID!) {
            user(userName: $userName) {
              ...JobOfferList_jobOffers
            }
          }
        `}
        variables={{ userName }}
        render={({ error, props }) => {
          if (error) {
            return <div>Unable to read data. Error: {error.message}</div>
          }

          if (!props) {
            return <div>Loading...</div>
          }

          if (!props.user) {
            return <div>Unable to find user with email: 'test@gmail.com'</div>
          }

          return (
            <section>
              <h1>Your current job offers</h1>
              <JobOfferList jobOffers={props.user} />
            </section>
          )
        }}
      />
    )
  }
}

export default JobOffersPage
