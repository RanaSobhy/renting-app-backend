require('dotenv').config();
let express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors");

const url = process.env.DB_URI;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

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
  res.send(`DB url ${url} var ${process.env.test}`);
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
