const { makeExecutableSchema, gql } = require('apollo-server');

const { getAllUsers, getUserById } = require('../../dataAccess/users');

const typeDefs = gql`
  type User {
    id: ID!
    first_name: String
    last_name: String
  }

  type Query {
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    user(parent, args, context, info) {
      const { id } = args;
      // coercing to int as is coming in as String over the wire
      return getUserById(parseInt(id));
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers,
});

// what was done with graphql-express
// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: {
//     id: { type: GraphQLInt },
//     first_name: { type: GraphQLString },
//     last_name: { type: GraphQLString },
//   },
// });

// module.exports.userSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       user: {
//         type: UserType,
//         args: {
//           id: { type: GraphQLInt },
//         },
//         resolve: (root, args, context, info) => {
//           const { id } = args;
//           return getUserById(id);
//         },
//       },
//     },
//   }),
// });
