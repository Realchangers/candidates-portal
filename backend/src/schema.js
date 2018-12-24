const service = require('./service')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = require('graphql')

const {
  connectionArgs,
  connectionFromArray,
  mutationWithClientMutationId,
  connectionDefinitions
} = require('graphql-relay')

const JobOfferType = new GraphQLObjectType({
  name: 'JobOffer',
  fields: {
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    company: { type: GraphQLString }
  }
})

const {
  connectionType: JobOfferConnection,
  edgeType: JobOfferEdgeType
} = connectionDefinitions({
  name: 'JobOffer',
  nodeType: JobOfferType
})

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields: {
    location: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    profile: { type: UserProfileType },

    jobOffers: {
      type: JobOfferConnection,
      args: {
        ...connectionArgs
      },
      resolve: (parent, args) => connectionFromArray(parent.jobOffers, args)
    }
  }
})

const UserProfileMutation = mutationWithClientMutationId({
  name: 'UserProfile',
  inputFields: {
    location: { type: GraphQLString }
  },
  outputFields: {
    profile: { type: UserProfileType }
  },
  mutateAndGetPayload: async ({ location }, context) => {
    return await service.updateUserProfile(location, context)
  }
})

module.exports.schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      currentUser: {
        type: UserType,
        resolve: service.currentUser
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updateUserProfile: UserProfileMutation
    }
  })
})
