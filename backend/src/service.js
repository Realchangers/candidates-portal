const { documentClient } = require('./config')

module.exports.currentUser = (_source, _args, context) => {
  return documentClient().query({
    TableName: process.env.DYNAMODB_TABLE,
    KeyConditionExpression: 'id = :userID',
    ExpressionAttributeValues: {
      ':userID': context.cognitoIdentityId
    }
  })
    .promise()
    .then(result => result.Items.length === 1 ? result.Items[0] : null)
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
