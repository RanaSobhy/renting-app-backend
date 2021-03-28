const Product = require("../Models/Product");
const Rental = require("../Models/Rental");

exports.create = (req, res) => {
  // Create a Product
  const product = new Product({
    ownerId: req.body.ownerId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    isRented: false,
    condition: req.body.condition,
    brand: req.body.brand,
    categoryId: req.body.categoryId,
    photo: req.body.photo
  });

  // Save product in the database
  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? {
        user: { $regex: new RegExp(name), $options: "i" },
      }
    : {};

  Product.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.get = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
      next(err);
    }
    if (!product) {
      res.status(404).send({ message: "Not Found!" });
    } else {
      res.json(product);
    }
  });
};

exports.update = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
        next(err);
      }
      if (!product) {
        res.status(404).send({ message: "Not Found!" });
      } else {
        res.json(product);
      }
    }
  );
};

exports.rent = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      isRented: true,
      rentedBy: req.body.rentedBy,
    },
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
        next(err);
      }
      if (!product) {
        res.status(404).send({ message: "Not Found!" });
      } else {
        const rental = new Rental({
          ownerId: product._id,
          rentedBy: req.body.rentedBy,
          returnDate: req.body.returnDate,
          isReturned: false,
        });

        // Save product in the database
        rental
          .save(rental)
          .then((data) => {})
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while renting the product.",
            });
          });
        res.json(product);
      }
    }
  );
};

exports.return = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      isRented: false,
      rentedBy: null,
    },
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
        next(err);
      }
      if (!product) {
        res.status(404).send({ message: "Not Found!" });
      } else {
        Rental.findOneAndUpdate(
          { ownerId: product._id, isReturned: false },
          {
            isReturned: true,
          },
          { new: true },
          (err, rental) => {
            if (err) {
              console.log(err);
              next(err);
            }
            if (!rental) {
              res.status(404).send({ message: "Not Found!" });
            } else {
              res.json(product);
            }
          }
        );
      }
    }
  );
};
