const auth = require("../Controllers/auth.controller");
var router = require("express").Router();

module.exports = (app) => {
  // Create a new User
  //router.post("/", users.create);

  // Retrieve all Users
  router.post("/login/google", auth.create);

  app.use("/api/auth", router);
};
