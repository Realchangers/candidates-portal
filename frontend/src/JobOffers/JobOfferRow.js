import React, { Component } from 'react'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

class JobOfferRow extends Component {
  render() {
    const { title, company } = this.props.offer
    return (
      <tr>
        <td>{company}</td>
        <td>{title}</td>
      </tr>
    )
  }
}

export default createFragmentContainer(
  JobOfferRow,
  graphql`
    fragment JobOfferRow_offer on JobOffer {
      title
      company
    }
  `
)
