const Product = require("../Models/Product");
const Rental = require("../Models/Rental");

exports.findAll = (req, res) => {
  Rental.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Rentals.",
      });
    });
};

exports.get = (req, res) => {
    Rental.findById(req.params.id, (err, rental) => {
    if (err) {
      console.log(err);
      next(err);
    }
    if (!rental) {
      res.status(404).send({ message: "Not Found!" });
    } else {
      res.json(rental);
    }
  });
};
