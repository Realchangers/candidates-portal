const AWS = require('aws-sdk')

let dynamoDbConfig = undefined
if (process.env.IS_OFFLINE) {
  dynamoDbConfig = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig)

module.exports.userByUserName = (parent, args) => {
  return dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'userName': args.userName },
  }).promise()
    .then(result => {
      if (result.Item) {
        return ({
          userName: result.Item.userName,
          firstName: result.Item.firstName,
          lastName: result.Item.lastName
        })
      }

      return null
    })
}

module.exports.insertUser = (parent, args) => {
  // put new user, or replace existing one
  return dynamoDb.put({
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      'userName': args.userName,
      'password': args.password,
      'firstName': args.firstName,
      'lastName': args.lastName
    }
  }).promise().then(() => args.userName)
}

module.exports.changeUserPassword = (parent, args) => {
  return dynamoDb.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'userName': args.userName },
    UpdateExpression: 'SET password = :password',
    ExpressionAttributeValues: {
      ':password': args.password
    }
  }).promise().then(() => args.userName)
}
