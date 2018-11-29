'use strict';

const AWS = require('aws-sdk')

let dynamoDbConfig = undefined
if (process.env.IS_OFFLINE) {
  dynamoDbConfig = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig)

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')

const getUserByFirstName = firstName =>
  dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
  }).promise()
    .then(result => {
      if (result.Item) {
        return ({
          id: "hohoho", // currently doesn't exist in database
          firstName: result.Item.firstName,
          nickname: result.Item.nickname
        })
      }
      else {
        return ({
          id: "hohoho",
          firstName: firstName,
          nickname: firstName
        })
      }
    })

const changeNickname = (firstName, nickname) =>
  dynamoDb.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
    UpdateExpression: 'SET nickname = :nickname',
    ExpressionAttributeValues: {
      ':nickname': nickname
    }
  }).promise()
    .then(() => nickname)

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    nickname: { type: GraphQLString },
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          firstName: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (parent, args) => getUserByFirstName(args.firstName)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType', // an arbitrary name
    fields: {
      changeNickname: {
        args: {
          firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) },
          nickname: { name: 'nickname', type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLString,
        resolve: (parent, args) => changeNickname(args.firstName, args.nickname)
      }
    }
  })
})

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
    .then(result => callback(null, { statusCode: 200, body: JSON.stringify(result) }))
    .catch(error => callback(null, {
      statusCode: 500, body: JSON.stringify({ errors: [{ message: error.message }] })
    }))
}
