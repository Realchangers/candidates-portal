import React, { Component } from 'react'
import JobOfferRow from './JobOfferRow';

import graphql from 'babel-plugin-relay/macro'
import { createPaginationContainer } from 'react-relay';

class JobOfferList extends Component {

  render() {
    const { jobOffers } = this.props.jobOffers

    let moreButton = undefined
    if (this.props.relay.hasMore()) {
      moreButton = <button className="button"
        onClick={() => this._loadMoreData()}
        aria-label="Load more jobs">
        More...
        </button>
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {jobOffers.edges.map(edge =>
              <JobOfferRow key={edge.node.id} offer={edge.node} />
            )}
          </tbody>
        </table>
        {moreButton}
      </div>
    )
  }

  _loadMoreData() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return
    }

    this.props.relay.loadMore(5, error => {
      if (error) {
        console.log(`Unable to load more items. Error: ${error}`)
      }
    })
  }
}

export default createPaginationContainer(
  JobOfferList,
  {
    jobOffers: graphql`
      fragment JobOfferList_jobOffers on User
      @argumentDefinitions(
        count: {type: "Int", defaultValue: 5}
        cursor: {type: "String"}
      ) {
        jobOffers(
          first: $count
          after: $cursor
        )
        @connection(key: "JobOfferList_jobOffers") {
          edges {
            node {
              id
              ...JobOfferRow_offer
            }
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.jobOffers && props.jobOffers.jobOffers
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        userName: fragmentVariables.userName
      }
    },
    query: graphql`
      query JobOfferListQuery(
        $count: Int!
        $cursor: String
        $userName: ID!
      ) {
        user: user(userName: $userName) {
          ...JobOfferList_jobOffers @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
)
