import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

class JobOfferRow extends Component {
  render() {
    const { id, title, company } = this.props.offer
    return (
      <tr>
        <td>{company}</td>
        <td><Link to={`/job/${id}`}>{title}</Link></td>
      </tr>
    )
  }
}

export default createFragmentContainer(
  JobOfferRow,
  graphql`
    fragment JobOfferRow_offer on JobOffer {
      id
      title
      company
    }
  `
)
