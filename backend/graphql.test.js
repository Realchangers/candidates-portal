const graphql = require('./graphql')

const service = require('./src/service')
jest.mock('./src/service')

it('should process GET request correctly', () => {
  return new Promise(resolve => {
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

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(200)
      expect(result.body).toBe('{"data":{"user":{"userName":"user@gmail.com","firstName":"Test","lastName":"User"}}}')

      resolve()
    })
  })
})

it('should process POST request correctly', () => {
  return new Promise(resolve => {
    service.userByUserName.mockResolvedValueOnce({
      userName: 'user@gmail.com',
      firstName: 'Test',
      lastName: 'User'
    })

    const event = {
      httpMethod: 'POST',
      body:
        '{\
          "query":"query UserQuery($userName: ID!) { user(userName: $userName) { userName firstName lastName  }}",\
          "variables":{"userName":"test@gmail.com"}\
        }'
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(200)
      expect(result.body).toBe('{"data":{"user":{"userName":"user@gmail.com","firstName":"Test","lastName":"User"}}}')

      resolve()
    })
  })
})

it('should reject unsupported request type', () => {
  return new Promise(resolve => {
    const event = {
      httpMethod: 'PUT'
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"Unsupported HTTP method: PUT"}]}')

      resolve()
    })
  })
})

it('should reject query without parameters', () => {
  return new Promise(resolve => {
    const event = {
      httpMethod: 'GET'
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('\{"errors":[{"message":"No parameters provided. You must provide \'query\' parameter in the request."}]}')

      resolve()
    })
  })
})

it('should reject query with wrong parameters', () => {
  return new Promise(resolve => {
    const event = {
      httpMethod: 'GET',
      queryStringParameters: {
        yohoho: 'query UserQuery { user(userName: "user@gmail.com") { userName firstName lastName  }}'
      }
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"Unable to find parameter \'query\' in GET request."}]}')

      resolve()
    })
  })
})

it('should reject POST request without body', () => {
  return new Promise(resolve => {
    const event = {
      httpMethod: 'POST'
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"No body specified in POST request."}]}')

      resolve()
    })
  })
})

it('should reject POST request with incorrect JSON payload', () => {
  return new Promise(resolve => {
    const event = {
      httpMethod: 'POST',
      body: '<xml><query>hohoho</query></xml>'
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"Unable to parse request. Reason: Unexpected token < in JSON at position 0"}]}')

      resolve()
    })
  })
})

it('should reject POST request with JSON payload without query', () => {
  return new Promise(resolve => {
    const event = {
      httpMethod: 'POST',
      body: '{"yolo": "here goes my query"}'
    }

    graphql.query(event, undefined, (error, result) => {
      expect(error).toBeNull()
      expect(result.statusCode).toBe(500)
      expect(result.body).toBe('{"errors":[{"message":"Unable to find field \'query\' in JSON payload."}]}')

      resolve()
    })
  })
})
