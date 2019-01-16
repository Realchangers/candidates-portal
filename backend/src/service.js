const { documentClient } = require('./config')
const { connectionFromArray } = require('graphql-relay')

module.exports.currentUser = (context) => {
  return { 'id': context.cognitoIdentityId }
}

module.exports.jobOffers = (args, context) => {
  return documentClient.query({
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: 'cognitoID = :cognitoID AND begins_with(id, :jobPrefix)',
    ExpressionAttributeValues: {
      ':cognitoID': context.cognitoIdentityId,
      ':jobPrefix': 'job_'
    }
  })
    .promise()
    .then(result => result.Items ? connectionFromArray(result.Items, args) : null)
}

module.exports.jobOffer = (context, id) => {
  return documentClient.get({
    TableName: process.env.TABLE_NAME,
    Key: {
      cognitoID: context.cognitoIdentityId,
      id
    }
  })
    .promise()
    .then(result => result.Item)
}

module.exports.userProfile = (context) => {
  return documentClient.get({
    TableName: process.env.TABLE_NAME,
    Key: {
      'cognitoID': context.cognitoIdentityId,
      'id': 'profile'
    },
  })
    .promise()
    .then(result => result.Item)
}

module.exports.updateUserProfile = (location, context) => {
  return documentClient.update({
    TableName: process.env.TABLE_NAME,
    Key: {
      'cognitoID': context.cognitoIdentityId,
      'id': 'profile'
    },
    UpdateExpression: 'SET #newLocation = :newLocation',
    ExpressionAttributeNames: {
      '#newLocation': 'location'
    },
    ExpressionAttributeValues: {
      ':newLocation': location
    },
    ReturnValues: 'UPDATED_NEW'
  })
    .promise()
    .then(result => ({ profile: result.Attributes }))
}
