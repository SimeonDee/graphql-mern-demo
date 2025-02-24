import { GraphQLID, GraphQLList, GraphQLObjectType } from "graphql";
import BookType from "./book.schema.mjs";
import AuthorType from "./author.schema.mjs";
import _ from "lodash";
import Book from "../models/book.mjs";
import Author from "../models/author.mjs";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const books = await Book.find({});
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const authors = await Author.find({});
        return _.find(authors, { id: args.id });
      },
    },

    books: {
      type: new GraphQLList(BookType),
      args: {},
      async resolve(parent, args) {
        return await Book.find({});
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      args: {},
      async resolve(parent, args) {
        return await Author.find({});
      },
    },
  },
});

export default RootQuery;
