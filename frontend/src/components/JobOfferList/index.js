import React, { Component } from 'react'
import JobOffer from '../JobOffer';

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay';
import Pagination from '../Pagination';

class JobOfferList extends Component {
  render() {
    const { jobOffers } = this.props.jobOffers
    return (
      <section>
        <h2>Your current job offers</h2>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            {jobOffers.map(
              offer => <JobOffer key={offer.id} offer={offer} />
            )}
          </tbody>
        </table>
        <Pagination />
      </section>
    )
  }
}

export default createFragmentContainer(
  JobOfferList,
  graphql`
    fragment JobOfferList_jobOffers on User {
      jobOffers(
        first: 2147483647  # max GraphQLInt
      )
      {
        id,
        ...JobOffer_offer
      }
    }
  `
)
