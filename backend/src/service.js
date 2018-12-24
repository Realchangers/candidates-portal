const { documentClient } = require('./config')

const id = '45d7c1e0-4770-4fc8-97ca-f707c5e6b841' // TODO: read the ID from Cognito

module.exports.currentUser = (parent, args) => {
  return documentClient().get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'id': id },
  })
    .promise()
    .then(result => result.Item)
}

module.exports.updateUserProfile = (location) => {
  return documentClient().update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'id': id },
    UpdateExpression: 'SET profile = :updatedProfile',
    ExpressionAttributeValues: {
      ':updatedProfile': {
        'location': location
      }
    },
    ReturnValues: "ALL_NEW"
  }).promise().then((result) => {
    return result.Attributes
  })
}
