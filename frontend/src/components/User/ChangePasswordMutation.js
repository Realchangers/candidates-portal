import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation ChangePasswordMutation($input: ChangePasswordInput!) {
    changeUserPassword(input: $input) {
      user {
        userName
        password
        firstName
        lastName
      }
    }
  }
`

function commit(
  environment,
  newPassword,
  user
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          currentPassword: user.password,
          newPassword,
          userName: user.userName
        }
      }
    }
  )
}

export default { commit }
