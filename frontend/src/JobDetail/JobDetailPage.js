import React, { Component } from 'react'

import { QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import environment from '../RelayEnvironment'

class JobDetailPage extends Component {

  render() {
    const jobID = this.props.match.params.jobID
    return <QueryRenderer
      environment={environment}
      query={graphql`
        query JobDetailPageQuery($jobID: ID!) {
          currentUser {
            jobOffer(id: $jobID) {
              title, company, description
            }
          }
        }
      `}
      variables={{ jobID }}
      render={({ error, props }) => {
        if (error) {
          return <div>Unable to read data. Error: {error.message}</div>
        }

        let jobOffer = {}
        if (props) {
          jobOffer = props.currentUser.jobOffer
        }

        return (
          <div>
            <h1>{jobOffer.title} - {jobOffer.company}</h1>
            <div>{jobOffer.description}</div>
          </div>
        )
      }}
    />
  }
}

export default JobDetailPage
