'use strict';

const { graphql } = require('graphql')
const { schema } = require('./src/schema')

const parseQuery = (event) => {
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
      reject(new Error('Unable to find parameter "query" in GET request.'))
      return
    }

    const query = event.queryStringParameters.query
    if (!query) {
      reject(new Error('Unable to find parameter "query" in GET request.'))
      return
    }

    resolve(query)
  })
}

const parsePostRequest = (event) => {
  return new Promise((resolve, reject) => {

    const body = event.body
    if (!body) {
      reject(new Error('No body specified in POST request.'))
      return
    }

    try {
      resolve(JSON.parse(body).query)
    }
    catch (error) {
      reject(new Error(`Unable to parse request. Reason: ${error.message}`))
      return
    }
  })
}

module.exports.query = (event, context, callback) => {
  parseQuery(event)
    .then(query => graphql(schema, query))
    .then(
      result => callback(null, {
        statusCode: 200,
        body: JSON.stringify(result)
      }),
      error => callback(null, {
        statusCode: 500,
        body: JSON.stringify({ errors: [{ message: error.message }] })
      })
    )
}
