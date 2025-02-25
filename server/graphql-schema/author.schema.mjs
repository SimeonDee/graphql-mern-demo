import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import _ from "lodash";
import { Book } from "../models/book.mjs";
import BookType from "./book.schema.mjs";

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const books = await Book.find({});
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

export default AuthorType;
