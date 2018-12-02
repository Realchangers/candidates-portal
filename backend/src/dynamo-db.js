const AWS = require('aws-sdk')

let dynamoDbConfig = undefined
if (process.env.IS_OFFLINE) {
  dynamoDbConfig = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig)

module.exports.userByUserName = (userName) => {
  return dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { userName },
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

module.exports.insertUser = (userName, password, firstName, lastName) => {
  // put new user, or replace existing one
  return dynamoDb.put({
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      'userName': userName,
      'password': password,
      'firstName': firstName,
      'lastName': lastName
    }
  }).promise().then(() => userName)
}

module.exports.changeUserPassword = (userName, password) => {
  return dynamoDb.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { userName },
    UpdateExpression: 'SET password = :password',
    ExpressionAttributeValues: {
      ':password': password
    }
  }).promise().then(() => userName)
}
