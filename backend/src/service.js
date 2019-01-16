const { documentClient } = require('./config')
const { connectionFromArraySlice, cursorToOffset } = require('graphql-relay')

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
    },
    Limit: limitFromArgs(args)
  })
    .promise()
    .then(result => connectionFromArraySlice(result.Items, args, {
      sliceStart: 0,
      arrayLength: result.Items.length
    }))
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

function limitFromArgs(args) {
  let limit = 10

  if (args.first) {
    limit = args.first + 1 // select one more item, so we know if we have more pages

    if (args.after) {
      const after = cursorToOffset(args.after) + 1 // add one to the offset, so it represents count
      limit += after
    }
  }

  return limit
}
