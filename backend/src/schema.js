const service = require('./service')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = require('graphql')

const {
  connectionArgs,
  mutationWithClientMutationId,
  connectionDefinitions
} = require('graphql-relay')

const SalaryType = new GraphQLObjectType({
  name: 'Salary',
  fields: {
    start: { type: GraphQLString },
    end: { type: GraphQLString }
  }
})

const JobOfferType = new GraphQLObjectType({
  name: 'JobOffer',
  fields: {
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    company: { type: GraphQLString },
    expiration: { type: GraphQLString },
    location: { type: GraphQLString },
    salary: { type: SalaryType }
  }
})

const {
  connectionType: JobOfferConnection
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
    profile: {
      type: UserProfileType,
      resolve: (_source, _args, context) => service.userProfile(context)
    },

    jobOffers: {
      type: JobOfferConnection,
      args: {
        ...connectionArgs
      },
      resolve: (_source, args, context) => service.jobOffers(args, context)
    },
    jobOffer: {
      type: JobOfferType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_source, args, context) => service.jobOffer(context, args.id)
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
  mutateAndGetPayload: ({ location }, context) => service.updateUserProfile(location, context)
})

module.exports.schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      currentUser: {
        type: UserType,
        resolve: (_source, _args, context) => service.currentUser(context)
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
