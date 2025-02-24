import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import mongoose from "mongoose";

// Connect to database
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});

import schema from "./graphql-schema/schema.mjs";

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/graphql", createHandler({ schema, graphiql: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server hit!" });
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
