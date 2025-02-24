import { GraphQLSchema } from "graphql";
import RootQuery from "./root-query.mjs";

// MUTATIONS

// Book Mutations
// const BookMutations = new GraphQLObjectType({
//   name: "BookMutation",
//   fields: {
//     type: BookType,
//     resol
//   }
// })

export default new GraphQLSchema({
  query: RootQuery,
});
