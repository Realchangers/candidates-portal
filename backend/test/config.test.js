const config = require('../src/config')

it('should create AWS DocumentClient correctly for local environment', () => {
  process.env.IS_OFFLINE = true

  const client = config.documentClient()
  expect(client).toBeDefined()
  expect(client.service.endpoint.href).toBe('http://localhost:8000/')
})

it('should create AWS DocumentClient correctly for production environment', () => {
  process.env.IS_OFFLINE = false

  const client = config.documentClient()
  expect(client).toBeDefined()
  expect(client.service.endpoint.href).toBe('https://dynamodb.eu-west-2.amazonaws.com/')
})
