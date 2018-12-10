import graphql from 'babel-plugin-relay/macro'
import { commitMutation } from 'react-relay';

const mutation = graphql`
  mutation ChangePasswordMutation($input: ChangePasswordInput!) {
    changeUserPassword(input: $input) {
      user {
        password
      }
    }
  }
`

function commit(
  environment,
  currentPassword,
  newPassword,
  userName,
  onCompleted
) {
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          currentPassword: currentPassword,
          newPassword,
          userName: userName
        }
      },
      onCompleted: onCompleted
    }
  )
}

export default { commit }
