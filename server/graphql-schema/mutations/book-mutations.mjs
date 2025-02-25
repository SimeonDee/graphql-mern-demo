import {
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import BookType from "../book.schema.mjs";
import { Book } from "../../models/book.mjs";

const BookMutation = new GraphQLObjectType({
  name: "BookMutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        price: { type: GraphQLFloat },
        authorId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { name, genre, price, authorId } = args;
        const createdBook = await Book.create({ name, genre, price, authorId });
        return createdBook;
      },
    },

    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        price: { type: GraphQLFloat },
        authorId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { id, name, genre, price, authorId } = args;
        const updatedBook = await Book.findByIdAndUpdate(id, {
          name,
          genre,
          price,
          authorId,
        });
        return updatedBook;
      },
    },

    deleteBook: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const deletedBook = await Book.findByIdAndDelete(args.id);
        return deletedBook;
      },
    },
  },
});

export default BookMutation;
