const { documentClient } = require('./config')

module.exports.currentUser = (_source, _args, context) => {
  return documentClient().get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'id': context.cognitoIdentityId },
  })
    .promise()
    .then(result => result.Item)
}

module.exports.updateUserProfile = (location, context) => {
  return documentClient().update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'id': context.cognitoIdentityId },
    UpdateExpression: 'SET profile = :updatedProfile',
    ExpressionAttributeValues: {
      ':updatedProfile': {
        'location': location
      }
    },
    ReturnValues: "UPDATED_NEW"
  })
    .promise()
    .then(result => result.Attributes)
}
