const { graphql } = require('graphql')

const service = require('../src/service')
jest.mock('../src/service')

it('should query the user correctly', () => {

  service.userByUserName.mockResolvedValueOnce({
    userName: 'user@gmail.com',
    firstName: 'Test',
    lastName: 'User'
  })

  const { schema } = require('../src/schema')
  const query = 'query UserQuery { user(userName: "user@gmail.com") { userName firstName lastName  }}'

  return graphql(schema, query)
    .then(result => {
      expect(result.errors).toBeUndefined()
      expect(result.data).toEqual({
        user: {
          userName: 'user@gmail.com',
          firstName: 'Test',
          lastName: 'User'
        }
      })
    })
})

it('should create a new user correctly', () => {
  service.insertUser.mockResolvedValueOnce('user@gmail.com')

  const { schema } = require('../src/schema')
  const query = 'mutation {createUser(userName: "user@gmail.com", password: "Password123!", firstName: "Test", lastName: "User")}'

  return graphql(schema, query)
    .then(result => {
      expect(result.errors).toBeUndefined()
      expect(result.data).toEqual({ "createUser": "user@gmail.com" })
    })
})

it('should change password correctly', () => {
  service.changeUserPassword.mockResolvedValueOnce('user@gmail.com')

  const { schema } = require('../src/schema')
  const query = 'mutation {changeUserPassword(userName: "user@gmail.com", password: "NewPassword!")}'

  return graphql(schema, query)
    .then(result => {
      expect(result.errors).toBeUndefined()
      expect(result.data).toEqual({ "changeUserPassword": "user@gmail.com" })
    })
})
