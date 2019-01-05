import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import { Link } from 'react-router-dom'

class JobDetail extends Component {
  render() {
    const { title, company, description } = this.props.jobOffer
    return (
      <div>
        <h1>{title} - {company}</h1>
        <div>{description}</div>
        <hr />
        <Link to="/">Back</Link>
      </div>
    )
  }
}

export default createFragmentContainer(
  JobDetail,
  graphql`
    fragment JobDetail_jobOffer on JobOffer {
      title
      description
      company
    }
  `
)
