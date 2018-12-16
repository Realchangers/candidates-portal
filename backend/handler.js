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

module.exports.query = (event, context, callback) => {
  parseRequestFrom(event)
    .then(request => graphql(schema, request.query, undefined, undefined, request.variables))
    .then(
      result => callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(result)
      }),
      error => callback(null, {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({ errors: [{ message: error.message }] })
      })
    )
}
