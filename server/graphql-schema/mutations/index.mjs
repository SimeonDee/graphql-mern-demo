import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
} from "graphql";
import BookType from "../book.schema.mjs";
import { Book } from "../../models/book.mjs";
import AuthorType from "../author.schema.mjs";
import { Author } from "../../models/author.mjs";
// import AuthorMutation from "./author-mutations.mjs";
// import BookMutation from "./book-mutations.mjs";

const RootMutation = new GraphQLObjectType({
  name: "mutation",
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
        const createdBook = await new Book({ name, genre, price, authorId });
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

    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const { name, age } = args;
        const createdAuthor = await new Author({
          name,
          age,
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

// const RootMutation = new GraphQLObjectType({
//   name: "mutation",
//   fields: { BookMutation, AuthorMutation },
// });

export default RootMutation;
