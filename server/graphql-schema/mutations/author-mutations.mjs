import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import AuthorType from "../author.schema.mjs";
import { Author } from "../../models/author.mjs";

const AuthorMutation = new GraphQLObjectType({
  name: "AuthorMutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const createdAuthor = await Author.create({
          name: args.name,
          age: args.age,
        });
        return createdAuthor;
      },
    },

    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const { id, name, age } = args;
        const updatedAuthor = await Author.findByIdAndUpdate(id, {
          name,
          age,
        });
        return updatedAuthor;
      },
    },

    deleteAuthor: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const deletedAuthor = await Author.findByIdAndDelete(args.id);
        return deletedAuthor;
      },
    },
  },
});

export default AuthorMutation;
