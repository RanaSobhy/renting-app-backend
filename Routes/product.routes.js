const products = require("../Controllers/product.controller");
var router = require("express").Router();
const { verifyToken } = require("../Middlewares/authJwt");

module.exports = (app) => {
  // Create a new product
  router.post("/", [verifyToken], products.create);

  router.get("/:id", products.get);

  router.put("/:id", [verifyToken], products.update);

  router.post("/:id/rent", [verifyToken], products.rent);

  router.post("/:id/return", [verifyToken], products.return);
  // Retrieve all products
  router.get("/", products.findAll);

  app.use("/api/products", router);
};
