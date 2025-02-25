import { GraphQLSchema } from "graphql";
import RootQuery from "./root-query.mjs";
import RootMutation from "./mutations/index.mjs";

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
