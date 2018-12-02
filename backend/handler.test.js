const handler = require('./handler')

const service = require('./src/service')
jest.mock('./src/service')

it('should process GET request correctly', () => {
  return new Promise((resolve) => {
    service.userByUserName.mockResolvedValueOnce({
      userName: 'user@gmail.com',
      firstName: 'Test',
      lastName: 'User'
    })

    const event = {
      httpMethod: 'GET',
      queryStringParameters: {
        query: 'query UserQuery { user(userName: "user@gmail.com") { userName firstName lastName  }}'
      }
    }

    handler.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(200)
      expect(result.body).toBe('{"data":{"user":{"userName":"user@gmail.com","firstName":"Test","lastName":"User"}}}')

      resolve()
    })
  })
})

it('should process POST request correctly', () => {
  return new Promise((resolve) => {
    service.userByUserName.mockResolvedValueOnce({
      userName: 'user@gmail.com',
      firstName: 'Test',
      lastName: 'User'
    })

    const event = {
      httpMethod: 'POST',
      body: '{"query":"query UserQuery { user(userName: \\"boucekm@gmail.com\\") { userName firstName lastName  }}"}'
    }

    handler.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(200)
      expect(result.body).toBe('{"data":{"user":{"userName":"user@gmail.com","firstName":"Test","lastName":"User"}}}')

      resolve()
    })
  })
})

it('should reject unsupported request type', () => {
  return new Promise((resolve) => {
    const event = {
      httpMethod: 'PUT'
    }

    handler.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"Unsupported HTTP method: PUT"}]}')

      resolve()
    })
  })
})

it('should reject malformed request', () => {
  return new Promise((resolve) => {
    const event = {
      httpMethod: 'POST',
      body: '<xml><query>hohoho</query></xml>'
    }

    handler.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"Unable to parse request. Reason: Unexpected token < in JSON at position 0"}]}')

      resolve()
    })
  })
})
