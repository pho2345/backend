const db = require("../models");
const Cart = db.cart;

exports.insert = (req, res) => {
  const cart = new Cart({
    user_id: {
      _id: req.userId,
    },
  });

  cart.save((err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (cart) {
      res.end();
      return;
    }
  });
};

exports.updateTotal = (req, res) => {
  var idCart = req.body._id;
  //var total = req.body.total;
  Cart.findByIdAndUpdate(
    idCart,
    { $set: { total: req.body.total } },
    { useFindAndModify: false, runValidators: true },
    (err, docs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (docs) {
        res.status(200).send({ message: "Cart update successfully" });
      } else {
        res.status(400).send({ message: "Not find Cart" });
      }
      return;
    }
  );
};

exports.find = async (req, res) => {
  Cart.find(
    { user_id: { _id: "6342fb8e10228608f0e08031" } },
    "-user_id -total"
  ).exec((err, cart) => {
    if (cart) {
      res.status(200).send(cart);
    }
    if (err) {
      res.status(500).send({ message: err });
    }
    return;
  });
};
