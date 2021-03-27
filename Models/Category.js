const uuid = require("node-uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Category = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    category: { type: String },
  },
  {
    collection: "categories",
  }
);

module.exports = mongoose.model("Category", Category);
