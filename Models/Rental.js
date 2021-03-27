const uuid = require("node-uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Rental = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    ownerId: { type: String },
    rentedBy: { type: String },
    returnDate: { type: Date },
    isReturned: { type: Boolean },
  },
  {
    collection: "Rentals",
  }
);

module.exports = mongoose.model("Rental", Rental);
