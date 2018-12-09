const service = require('../src/service')

const config = require('../src/config')

jest.mock('../src/config')

beforeAll(() => {
  process.env.DYNAMODB_TABLE = 'test_table'
})

it('should get correct user by user name', () => {
  const documentClientGetFn = jest.fn(() => ({
    promise: () => Promise.resolve({
      Item: {
        userName: 'test@gmail.com',
        firstName: 'Test',
        lastName: 'User'
      }
    })
  }))

  config.documentClient.mockReturnValueOnce({
    get: documentClientGetFn
  })

  const args = { userName: 'test@gmail.com' }
  return service.userByUserName(undefined, args)
    .then(result => {
      expect(result).toBeDefined()
      expect(result.userName).toBe('test@gmail.com')
      expect(result.firstName).toBe('Test')
      expect(result.lastName).toBe('User')

      expect(documentClientGetFn).toHaveBeenNthCalledWith(1, {
        TableName: 'test_table',
        Key: { 'userName': 'test@gmail.com' },
      })
    })
})

it('should not get user with wrong user name', () => {
  const documentClientGetFn = jest.fn(() => ({
    promise: () => Promise.resolve({})
  }))

  config.documentClient.mockReturnValueOnce({
    get: documentClientGetFn
  })

  const args = { userName: 'test@gmail.com' }
  return service.userByUserName(undefined, args)
    .then(result => {
      expect(result).toBeUndefined()
      expect(documentClientGetFn).toHaveBeenNthCalledWith(1, {
        TableName: 'test_table',
        Key: { 'userName': 'test@gmail.com' },
      })
    })
})

it('should insert new user correctly', () => {

  const documentClientPutFn = jest.fn(() => ({
    promise: () => Promise.resolve()
  }))

  config.documentClient.mockReturnValueOnce({
    put: documentClientPutFn
  })

  const args = {
    userName: 'test@gmail.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User'
  }

  return service.insertUser(undefined, args)
    .then(result => {
      expect(result).toBe('test@gmail.com')
      expect(documentClientPutFn).toHaveBeenNthCalledWith(1, {
        TableName: 'test_table',
        Item: {
          'userName': 'test@gmail.com',
          'password': 'Password123!',
          'firstName': 'Test',
          'lastName': 'User'
        }
      })
    })
})

it("should change user's password correctly", () => {
  const documentClientUpdateFn = jest.fn(() => ({
    promise: () => Promise.resolve()
  }))

  config.documentClient.mockReturnValueOnce({
    update: documentClientUpdateFn
  })

  const args = {
    userName: 'test@gmail.com',
    password: 'NewPassword123!'
  }

  return service.changeUserPassword(undefined, args)
    .then(result => {
      expect(result).toBe('test@gmail.com')
      expect(documentClientUpdateFn).toHaveBeenNthCalledWith(1, {
        TableName: 'test_table',
        Key: { 'userName': 'test@gmail.com' },
        UpdateExpression: 'SET password = :password',
        ExpressionAttributeValues: {
          ':password': 'NewPassword123!'
        }
      })
    })
})
