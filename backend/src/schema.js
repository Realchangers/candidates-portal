const service = require('./service')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const {
  mutationWithClientMutationId
} = require('graphql-relay')

const jobOfferType = new GraphQLObjectType({
  name: 'JobOffer',
  fields: {
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    company: { type: GraphQLString }
  }
})

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userName: { type: GraphQLID },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },

    jobOffers: {
      type: new GraphQLList(jobOfferType),
      args: {
        first: { type: GraphQLInt }
      },
      resolve: service.jobOffers
    }
  }
})

const ChangePasswordMutation = mutationWithClientMutationId({
  name: 'ChangePassword',
  inputFields: {
    currentPassword: { type: new GraphQLNonNull(GraphQLString) },
    newPassword: { type: new GraphQLNonNull(GraphQLString) },
    userName: { type: new GraphQLNonNull(GraphQLID) }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (args) => {
        return service.userByUserName(undefined, args)
      }
    }
  },
  mutateAndGetPayload: ({ userName, currentPassword, newPassword }) => {
    return service.changeUserPassword(undefined, {
      userName: userName,
      password: newPassword
    })
      .then(userName => ({ userName }))
  }
})

module.exports.schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          userName: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: service.userByUserName
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      changeUserPassword: ChangePasswordMutation
    }
  })
})
