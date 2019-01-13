const { documentClient } = require('./config')
const { connectionFromArray } = require('graphql-relay')

module.exports.currentUser = (context) => {
  return { 'id': context.cognitoIdentityId }
}

module.exports.jobOffers = (args, context) => {
  return documentClient.query({
    TableName: process.env.JOBS_TABLE,
    KeyConditionExpression: 'cognitoID = :identity',
    ExpressionAttributeValues: {
      ':identity': context.cognitoIdentityId
    }
  })
    .promise()
    .then(result => result.Items ? connectionFromArray(result.Items, args) : null)
}

module.exports.jobOffer = (context, id) => {
  return documentClient.get({
    TableName: process.env.JOBS_TABLE,
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
    TableName: process.env.PROFILES_TABLE,
    Key: { 'id': context.cognitoIdentityId },
  })
    .promise()
    .then(result => result.Item)
}

module.exports.updateUserProfile = (location, context) => {
  return documentClient.update({
    TableName: process.env.PROFILES_TABLE,
    Key: { 'id': context.cognitoIdentityId },
    UpdateExpression: 'SET #newLocation = :newLocation',
    ExpressionAttributeNames: {
      '#newLocation': 'location'
    },
    ExpressionAttributeValues: {
      ':newLocation': location
    },
    ReturnValues: "UPDATED_NEW"
  })
    .promise()
    .then(result => ({ profile: result.Attributes }))
}
