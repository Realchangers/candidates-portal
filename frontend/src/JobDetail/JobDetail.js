import React, { Component } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'
import { Link } from 'react-router-dom'

class JobDetail extends Component {
  render() {
    const { title, company, description, expiration, location, salary } = this.props.jobOffer

    let salaryElement
    if (salary) {
      salaryElement = <li>Salary: {salary.start} - {salary.end}</li>
    }

    return (
      <div>
        <h1>{title} - {company}</h1>
        <div>{description}</div>
        <hr />
        <ul>
          <li>Expiration: {expiration}</li>
          <li>Location: {location}</li>
          {salaryElement}
        </ul>
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
      expiration
      location
      salary {
        start
        end
      }
    }
  `
)
