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
