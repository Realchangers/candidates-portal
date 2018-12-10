import React, { Component } from 'react'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

class JobOffer extends Component {
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
  JobOffer,
  graphql`
    fragment JobOffer_offer on JobOffer {
      title
      company
    }
  `
)
