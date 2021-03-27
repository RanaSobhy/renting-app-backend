const Product = require("../Models/Product");

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
