const categories = require("../Controllers/category.controller");
var router = require("express").Router();
const { verifyToken } = require("../Middlewares/authJwt");

module.exports = (app) => {
  router.post("/", [verifyToken] ,categories.add);

  router.get("/", categories.getAll);

  app.use("/api/categories", router);
};
