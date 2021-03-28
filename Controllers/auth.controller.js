const User = require("../Models/User");

exports.create = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      next(err);
    }

    if (!user) {
      var newUser = new User(req.body);
      newUser.save((err, save) => {
        if (err) next(err);
        else {
          res.json(save);
        }
      });
    } else {
      res.json(user);
    }
  });
};
