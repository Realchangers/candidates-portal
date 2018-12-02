'use strict';

const { graphql } = require('graphql')
const { schema } = require('./src/schema')

const parseQuery = (event) => {
  return new Promise((resolve, reject) => {

    if (event.queryStringParameters) {
      const getQuery = event.queryStringParameters.query
      if (getQuery) {
        resolve(getQuery)
        return
      }
    }

    try {
      const postQuery = JSON.parse(event.body).query
      if (postQuery) {
        resolve(postQuery)
      }
      else {
        reject(new Error(`Unable to find query in parameter.`))
      }
    }
    catch (error) {
      reject(new Error(`Unable to parse request. Reason: ${error.message}`))
    }
  })
}

module.exports.query = (event, context, callback) => {
  parseQuery(event)
    .then(query => graphql(schema, query))
    .then(result => {
      const statusCode = result.errors ? 500 : 200
      callback(null, { statusCode: statusCode, body: JSON.stringify(result) })
    })
    .catch(error => callback(null, {
      statusCode: 500, body: JSON.stringify({ errors: [{ message: error.message }] })
    }))
}
