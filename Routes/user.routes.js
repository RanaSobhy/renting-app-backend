const users = require("../Controllers/user.controller");
var router = require("express").Router();

module.exports = (app) => {
  // Create a new User
  //router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  app.use("/api/users", router);
};
