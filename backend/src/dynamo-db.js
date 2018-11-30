const AWS = require('aws-sdk')

let dynamoDbConfig = undefined
if (process.env.IS_OFFLINE) {
  dynamoDbConfig = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig)

module.exports.getUserByFirstName = (firstName) => {
  return dynamoDb.get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
  }).promise()
    .then(result => {
      if (result.Item) {
        return ({
          id: result.Item.id,
          firstName: result.Item.firstName,
          nickname: result.Item.nickname
        })
      }
      else {
        return null
      }
    })
}

module.exports.changeNickname = (firstName, nickname) => {
  return dynamoDb.update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { firstName },
    UpdateExpression: 'SET nickname = :nickname',
    ExpressionAttributeValues: {
      ':nickname': nickname
    }
  }).promise().then(() => nickname)
}
