import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
} from "graphql";
import _ from "lodash";

const books = [
  {
    id: "1",
    name: "Book 1",
    genre: "arts",
    price: 5000,
    author: { id: "1", name: "Author 1" },
  },
  {
    id: "2",
    name: "Book 2",
    genre: "fantasy",
    price: 2400,
    author: { id: "1", name: "Author 1" },
  },
  {
    id: "3",
    name: "Book 3",
    genre: "comics",
    price: 8500,
    author: { id: "3", name: "Author 3" },
  },
];

const authors = [
  { id: "1", name: "Author 1" },
  { id: "2", name: "Author 2" },
  { id: "3", name: "Author 3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    price: { type: GraphQLFloat },
    author: { type: AuthorType },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    books: { type: new GraphQLList(BookType) },
  }),
});

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

    books: {
      type: new GraphQLList(BookType),
      args: {},
      resolve(parent, args) {
        return books;
      },
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
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

export default new GraphQLSchema({
  query: RootQuery,
});
