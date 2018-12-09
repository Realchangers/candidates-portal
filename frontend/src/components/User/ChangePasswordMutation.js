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
  newPassword,
  user,
  onCompleted
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
      },
      onCompleted: onCompleted
    }
  )
}

export default { commit }
