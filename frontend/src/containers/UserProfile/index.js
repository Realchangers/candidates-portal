import React, { Component } from 'react'
import JobOfferList from '../../components/JobOfferList'

import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay';

import environment from '../../RelayEnvironment'

class UserProfile extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserProfileQuery {
            user(userName: "test@gmail.com") {
              userName
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

          if (!props.user) {
            return <div>Unable to find user with email: 'test@gmail.com'</div>
          }

          return (
            <div>
              <div>User: {props.user.userName}</div>
              <JobOfferList jobOffers={props.user} />
            </div>
          )
        }}
      />
    );
  }
}

export default UserProfile
