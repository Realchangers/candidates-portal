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

    let query
    try {
      query = JSON.parse(body).query
    }
    catch (error) {
      reject(new Error(`Unable to parse request. Reason: ${error.message}`))
      return
    }

    resolve(query)
  })
}

module.exports.query = (event, context, callback) => {
  parseQuery(event)
    .then(query => graphql(schema, query))
    .then(
      result => {
        const statusCode = result.errors ? 500 : 200
        const body = JSON.stringify(result)

        callback(null, { statusCode: statusCode, body: body })
      },
      error => {
        const statusCode = 500
        const body = JSON.stringify({ errors: [{ message: error.message }] })

        callback(null, { statusCode: statusCode, body: body })
      })
}
