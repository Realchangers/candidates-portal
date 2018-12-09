import React, { Component } from 'react'
import JobOfferList from '../../components/JobOfferList'

import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay';

import environment from '../../RelayEnvironment'
import User from '../../components/User';

class UserProfile extends Component {
  render() {
    const userName = "test@gmail.com";
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserProfileQuery($userName: ID!) {
            user(userName: $userName) {
              ...User_userDetails
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
            <div>
              <User userDetails={props.user} />
              <JobOfferList jobOffers={props.user} />
            </div>
          )
        }}
      />
    );
  }
}

export default UserProfile
