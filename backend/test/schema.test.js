const { graphql } = require('graphql')

const { schema } = require('../src/schema')
const service = require('../src/service')
jest.mock('../src/service')

it('should query the user and his job offers correctly', () => {

  service.userByUserName.mockResolvedValueOnce({
    userName: 'user@gmail.com',
    firstName: 'Test',
    lastName: 'User'
  })

  service.jobOffers.mockResolvedValueOnce([{
    id: "1",
    title: "Developer",
    company: "Realchangers"
  }])

  const query =
    `query UserQuery {
      user(userName: "user@gmail.com") {
        userName firstName lastName
        jobOffers(first: 1) {
          edges {
            node {
              id title company
            }
          }
        }
      }
    }`

  return graphql(schema, query)
    .then(result => {
      expect(result.errors).toBeUndefined()
      expect(result.data).toEqual({
        user: {
          userName: 'user@gmail.com',
          firstName: 'Test',
          lastName: 'User',
          jobOffers: {
            edges: [
              {
                node: {
                  id: "1",
                  title: "Developer",
                  company: "Realchangers"
                }
              }
            ]
          }
        }
      })
    })
})

it('should change password correctly', () => {

  service.changeUserPassword.mockResolvedValueOnce('user@gmail.com')
  service.userByUserName.mockResolvedValueOnce({
    userName: 'user@gmail.com',
    firstName: 'Test',
    lastName: 'User'
  })

  const query = `
    mutation ChangeUserPaswordMutation($input: ChangePasswordInput!) {
      changeUserPassword(input: $input) {
        user {
          userName
        }
      }
    }
  `
  const variables = {
    input: {
      userName: "user@gmail.com",
      currentPassword: "CurrentPassword!",
      newPassword: "NewPassword1!"
    }
  }

  return graphql(schema, query, undefined, undefined, variables)
    .then(result => {
      expect(result.errors).toBeUndefined()
      expect(result.data).toEqual({
        "changeUserPassword": {
          "user": {
            "userName": "user@gmail.com"
          }
        }
      })
    })
})
