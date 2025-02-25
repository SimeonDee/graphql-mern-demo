import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: String,
    genre: String,
    price: Number,
    authorId: String,
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
