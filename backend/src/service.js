const { documentClient } = require('./config')

module.exports.userByUserName = (parent, args) => {
  return documentClient().get({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'userName': args.userName },
  })
    .promise()
    .then(result => result.Item)
}

module.exports.insertUser = (parent, args) => {
  // put new user, or replace existing one
  return documentClient().put({
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      'userName': args.userName,
      'password': args.password,
      'firstName': args.firstName,
      'lastName': args.lastName
    }
  }).promise().then(() => args.userName)
}

module.exports.changeUserPassword = (parent, args) => {
  return documentClient().update({
    TableName: process.env.DYNAMODB_TABLE,
    Key: { 'userName': args.userName },
    UpdateExpression: 'SET password = :password',
    ExpressionAttributeValues: {
      ':password': args.password
    }
  }).promise().then(() => args.userName)
}

module.exports.jobOffers = (parent, args) => {
  const offers = parent.jobOffers
  if (offers) {
    return offers.slice(0, args.first)
  }

  return offers
}
