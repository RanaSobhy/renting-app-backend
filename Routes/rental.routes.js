const rentals = require("../Controllers/rental.controller");
var router = require("express").Router();
const { verifyToken } = require("../Middlewares/authJwt");

module.exports = (app) => {

  router.get("/:id", rentals.get);
  // Retrieve all products
  router.get("/", rentals.findAll);

  app.use("/api/rentals", router);
};
