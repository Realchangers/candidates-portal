import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime'

import { Auth } from 'aws-amplify'

function fetchQuery(operation, variables) {
  return Auth.currentSession()
    .then(session => fetch(process.env.REACT_APP_GRAPHQL_QUERY_URL, {
      method: 'POST',
      headers: {
        'Authorization': session.getIdToken().getJwtToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }))
    .then(response => response.json())
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

export default environment
