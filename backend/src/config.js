const AWS = require('aws-sdk')

module.exports.documentClient = () => {
  let dynamoDbConfig = undefined
  if (process.env.IS_OFFLINE) {
    dynamoDbConfig = {
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    }
  }

  return new AWS.DynamoDB.DocumentClient(dynamoDbConfig)
}
