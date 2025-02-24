import BookType from "./book.schema.mjs";
import { GraphQLID } from "graphql";
import BookType from "./book.schema.mjs";
import AuthorType from "./author.schema.mjs";
import _ from "lodash";
import { books, authors } from "./sample_data.mjs";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },

    books: {
      type: new GraphQLList(BookType),
      args: {},
      resolve(parent, args) {
        return books;
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      args: {},
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

export default RootQuery;
