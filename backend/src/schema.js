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
      createUser: {
        args: {
          userName: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          lastName: { type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLString,
        resolve: service.insertUser
      },
      changeUserPassword: {
        args: {
          userName: { type: new GraphQLNonNull(GraphQLID) },
          password: { type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLString,
        resolve: service.changeUserPassword
      }
    }
  })
})
