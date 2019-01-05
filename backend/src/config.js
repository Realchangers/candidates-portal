const AWS = require('aws-sdk')

let dynamoDbConfig = undefined
if (process.env.IS_OFFLINE === 'true') {
  dynamoDbConfig = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

module.exports.documentClient = new AWS.DynamoDB.DocumentClient(dynamoDbConfig)
