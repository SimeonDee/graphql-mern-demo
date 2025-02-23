import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} from "graphql";
import _ from "lodash";

const books = [
  { id: "1", name: "book 1", genre: "arts" },
  { id: "2", name: "book 2", genre: "fantasy" },
  { id: "3", name: "book 3", genre: "comics" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
