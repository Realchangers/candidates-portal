'use strict';

const { graphql } = require('graphql')

const { schema } = require('./src/graphql')

const parseQuery = (event) => {
  return new Promise((resolve, reject) => {
    try {
      const result = JSON.parse(event.body).query
      console.log(`Query: ${result}`)

      resolve(result)
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
