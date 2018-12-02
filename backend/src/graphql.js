const service = require('./service')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userName: { type: GraphQLID },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
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
        resolve: (parent, args) => service.userByUserName(args.userName)
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
        resolve: (parent, args) => service.insertUser(args.userName, args.password, args.firstName, args.lastName)
      },
      changeUserPassword: {
        args: {
          userName: { type: new GraphQLNonNull(GraphQLID) },
          password: { type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLString,
        resolve: (parent, args) => service.changeUserPassword(args.id, args.userName)
      }
    }
  })
})
