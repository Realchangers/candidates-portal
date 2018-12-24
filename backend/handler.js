'use strict';

const { graphql } = require('graphql')
const { schema } = require('./src/schema')

const parseRequestFrom = (event) => {
  switch (event.httpMethod) {
    case 'GET':
      return parseGetRequest(event)
    case 'POST':
      return parsePostRequest(event)
    default:
      return Promise.reject(new Error(`Unsupported HTTP method: ${event.httpMethod}`))
  }
}

const parseGetRequest = (event) => {
  return new Promise((resolve, reject) => {

    if (!event.queryStringParameters) {
      reject(new Error("No parameters provided. You must provide 'query' parameter in the request."))
      return
    }

    const query = event.queryStringParameters.query
    if (!query) {
      reject(new Error("Unable to find parameter 'query' in GET request."))
      return
    }

    const variables = event.queryStringParameters.variables
    resolve({ query, variables })
  })
}

const parsePostRequest = (event) => {
  return new Promise((resolve, reject) => {

    const body = event.body
    if (!body) {
      reject(new Error('No body specified in POST request.'))
      return
    }

    let parsedJSON = undefined
    try {
      parsedJSON = JSON.parse(body)
    }
    catch (error) {
      reject(new Error(`Unable to parse request. Reason: ${error.message}`))
      return
    }

    const query = parsedJSON.query
    if (!query) {
      reject(new Error("Unable to find field 'query' in JSON payload."))
      return
    }

    const variables = parsedJSON.variables
    resolve({ query, variables })
  })
}

const responseFromCodeAndBody = (body) => {
  const code = body.errors ? 500 : 200
  return ({
    statusCode: code,
    headers: {
      "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent',
      "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  })
}

const cognitoIdentityFromEvent = (event) => {
  if (event.isOffline) {
    // serverless-offline plugin provides custom, fixed value
    // this can be customised via HTTP header 'cognito-identity-id' (if running in offline mode)
    return event.requestContext.identity.cognitoIdentityId
  }
  else {
    return event.requestContext.authorizer.claims["cognito:username"]
  }
}

module.exports.query = (event, _context, callback) => {

  const contextValue = {
    cognitoIdentityId: cognitoIdentityFromEvent(event)
  }

  parseRequestFrom(event)
    .then(request => graphql(schema, request.query, undefined, contextValue, request.variables))
    .then(
      result => callback(null, responseFromCodeAndBody(result)),
      error => callback(null, responseFromCodeAndBody({ errors: [{ message: error.message }] }))
    )
}
