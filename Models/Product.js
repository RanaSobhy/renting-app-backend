const uuid = require("node-uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    ownerId: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: String },
    isRented: { type: Boolean },
    rentedBy: { type: String },
    condition: { type: String, enum: ["New", "Used"] },
    brand: { type: String },
    categoryId: { type: String },
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Product", Product);
