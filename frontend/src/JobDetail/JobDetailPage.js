import React, { Component } from 'react'
import { QueryRenderer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import environment from '../RelayEnvironment'
import JobDetail from './JobDetail'

class JobDetailPage extends Component {
  render() {
    return <QueryRenderer
      environment={environment}
      query={graphql`
        query JobDetailPageQuery($jobID: ID!) {
          currentUser {
            jobOffer(id: $jobID) {
              ...JobDetail_jobOffer
            }
          }
        }
      `}
      variables={{ jobID: this.props.match.params.jobID }}
      render={({ error, props }) => {
        if (error) {
          return <div>Unable to read data. Error: {error.message}</div>
        }

        if (props) {
          return <JobDetail jobOffer={props.currentUser.jobOffer} />
        }
        else {
          return <div></div>
        }
      }}
    />
  }
}

export default JobDetailPage
