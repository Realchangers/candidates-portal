import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay'

const mutation = graphql`
  mutation UserProfileMutation($input: UserProfileInput!) {
    updateUserProfile(input: $input) {
      profile {
        location
      }
    }
  }
`

function commit(
  environment,
  location,
  onCompleted
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          location: location,
        }
      },
      onCompleted: onCompleted
    }
  )
}

export default { commit }
