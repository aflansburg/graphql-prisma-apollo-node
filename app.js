/*
  Just a  note on why I'm using require (CommonJS) vs import (ES6 modules)
  Node docs state here: https://nodejs.org/docs/latest-v12.x/api/esm.html#esm_ecmascript_modules
  "Expect major changes in the implementation including interoperability support,
   specifier resolution, and default behavior." for 12.x LTS version
*/

const { ApolloServer } = require('apollo-server');
const UserSchema = require('./src/api/gql/users');

/*
  this seems pretty useful actually:
    // https://www.apollographql.com/docs/apollo-server/api/graphql-tools/

    const rootResolveFunction = (parent, args, context, info) => {
    //perform action before any other resolvers
  };
  addSchemaLevelResolveFunction(schema, rootResolveFunction)
*/

const server = new ApolloServer({ schema: UserSchema });

// define a route for graphql
// being explicit with net.Server.listen options (http.Server)
server.listen({ host: 'localhost', port: 4000 }).then(({ url }) => {
  console.log(
    'Apollo server listening on port 4000 -> http://localhost:4000/graphql for GraphIQL'
  );
});
