const database = require('./dynamo-db')

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
    id: { type: GraphQLID },
    userName: { type: GraphQLString }
  }
})

module.exports.schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (parent, args) => database.userById(args.id)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      changeUserName: {
        args: {
          id: { name: 'id', type: new GraphQLNonNull(GraphQLID) },
          userName: { name: 'userName', type: new GraphQLNonNull(GraphQLString) }
        },
        type: GraphQLString,
        resolve: (parent, args) => database.updateUserById(args.id, args.userName)
      }
    }
  })
})
