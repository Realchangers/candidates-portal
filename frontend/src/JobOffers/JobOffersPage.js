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
              ...JobOfferList_jobOffers
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

          let jobOffersComponent
          if (props.currentUser && props.currentUser.jobOffers) {
            jobOffersComponent = <JobOfferList jobOffers={props.currentUser} />

          }
          else {
            jobOffersComponent = <div>You have currently no job offers. Please check again later!</div>
          }

          return (
            <section>
              <h1>Your current job offers</h1>
              {jobOffersComponent}
            </section>
          )
        }}
      />
    )
  }
}

export default JobOffersPage
