import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
} from "graphql";
import _ from "lodash";
import { books, authors } from "./sample_data.mjs";
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
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
    similarBooks: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(
          books,
          (b) => b.genre === parent.genre && b.id !== parent.id // other books with same genre
        );
      },
    },
  }),
});

export default BookType;
