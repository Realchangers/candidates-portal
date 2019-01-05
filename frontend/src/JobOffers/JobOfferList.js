import React, { Component } from 'react'
import JobOfferRow from './JobOfferRow';

import graphql from 'babel-plugin-relay/macro'
import { createPaginationContainer } from 'react-relay';

class JobOfferList extends Component {

  render() {

    let jobOffers
    if (this.props.currentUser) {
      jobOffers = this.props.currentUser.jobOffers
    }
    else {
      jobOffers = {
        edges: []
      }
    }

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
        <table className="hover">
          <thead>
            <tr>
              <th width="50%">Company</th>
              <th width="50%">Position</th>
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

    this.props.relay.loadMore(50, error => {
      if (error) {
        console.log(`Unable to load more items. Error: ${error}`)
      }
    })
  }
}

export default createPaginationContainer(
  JobOfferList,
  {
    currentUser: graphql`
      fragment JobOfferList_currentUser on User
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
      return props.currentUser && props.currentUser.jobOffers
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        id: fragmentVariables.id
      }
    },
    query: graphql`
      query JobOfferListQuery(
        $count: Int!
        $cursor: String
      ) {
        user: currentUser {
          ...JobOfferList_currentUser @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
)
