import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
} from "graphql";
import _ from "lodash";
import Book from "../models/book.mjs";
import Author from "../models/author.mjs";
import AuthorType from "./author.schema.mjs";

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    price: { type: GraphQLFloat },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        const authors = await Author.find({});
        return _.find(authors, { id: parent.authorId });
      },
    },
    similarBooks: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const books = await Book.find({});
        return _.filter(
          books,
          (b) => b.genre === parent.genre && b.id !== parent.id // other books with same genre
        );
      },
    },
  }),
});

export default BookType;
