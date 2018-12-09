import React, { Component } from 'react'

import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

class JobOffer extends Component {
  render() {
    const { title, description } = this.props.offer
    return <li>{title} - {description}</li>
  }
}

export default createFragmentContainer(
  JobOffer,
  graphql`
    fragment JobOffer_offer on JobOffer {
      title
      description
    }
  `
)