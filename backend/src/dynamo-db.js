const AWS = require('aws-sdk')

let dynamoDbConfig = undefined
if (process.env.IS_OFFLINE) {
  dynamoDbConfig = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig)

module.exports.userById = (id) => {
  return dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id },
  }).promise()
    .then(result => {
      if (result.Item) {
        return ({
          id: result.Item.id,
          userName: result.Item.userName
        })
      }

      return null
    })
}

module.exports.updateUserById = (id, userName) => {
  return dynamoDb.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id },
    UpdateExpression: 'SET userName = :userName',
    ExpressionAttributeValues: {
      ':userName': userName
    }
  }).promise().then(() => userName)
}
