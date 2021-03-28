const uuid = require("node-uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    mobile: {
      type: String,
    },
    picture: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);
