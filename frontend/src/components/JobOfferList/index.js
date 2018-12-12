import React, { Component } from 'react'
import JobOffer from '../JobOffer';

import graphql from 'babel-plugin-relay/macro'
import { createPaginationContainer } from 'react-relay';

class JobOfferList extends Component {
  render() {
    const { jobOffers } = this.props.jobOffers
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
              <JobOffer key={edge.node.id} offer={edge.node} />
            )}
          </tbody>
        </table>
        <nav aria-label="Pagination">
          <ul className="pagination">
            <li className="pagination-previous">
              <button onClick={() => this._loadPreviousPage()} aria-label="Previous page">
                Previous <span className="show-for-sr">page</span>
              </button>
            </li>
            <li className="pagination-next">
              <button onClick={() => this._loadNextPage()} aria-label="Next page">
                Next <span className="show-for-sr">page</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  _loadPreviousPage() {
    // ...
    console.log('Load previous page not yet implemented.')
  }

  // TODO: only loads more data, doesn't display only current page
  _loadNextPage() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return
    }

    this.props.relay.loadMore(5, error => {
      console.log(`Unable to load more items. Error: ${error}`)
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
              ...JobOffer_offer
            }
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      const result = props.jobOffers && props.jobOffers.jobOffers
      console.log(`Connection from props: ${JSON.stringify(result)}`)
      return result
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
