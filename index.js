let express = require("express"),
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors");

const app = express();
app.use(cors());

// API root
// app.use("/api", bookRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
