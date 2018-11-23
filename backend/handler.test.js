const handler = require('./handler')

it('should just work', () => {
  return new Promise((resolve, reject) => {

    const event = {
      queryStringParameters: {
        query: '{greeting(firstName: "Jeremy")}'
      }
    }
    const context = {}

    handler.query(event, context, (error, response) => {
      expect(error).toBeNull()
      expect(response.body).toBe('{"data":{"greeting":"Hello, Jeremy."}}')

      resolve()
    })
  })
})
