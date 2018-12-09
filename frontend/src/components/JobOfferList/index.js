import React, { Component } from 'react'
import JobOffer from '../JobOffer';

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay';

class JobOfferList extends Component {
  render() {
    const { jobOffers: { offers } } = this.props
    return (
      <section>
        <ul>
          {offers.map(offer => <JobOffer key={offer.id} offer={offer} />)}
        </ul>
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
