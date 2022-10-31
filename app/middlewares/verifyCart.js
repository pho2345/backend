const { user } = require("../models");
const db = require("../models");
const Cart = db.cart;

checkIdUserinCart = (req, res, next) => {
  Cart.find({ user_id: { _id: req.userId } }, "-user_id -total").exec(
    (err, cart) => {
      if (cart.length) {
        res.status(400).send({ message: "Cart exists" });
        return;
      }
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      next();
    }
  );
};

checkIdCart = async (req, res, next) => {
  const cartId = await Cart.findOne({ user_id: req.userId }).exec();
  req.cartId = cartId._id;
  Cart.findById(req.cartId).exec((err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!cart) {
      res.status(500).send({ message: "Cart not exists" });
      return;
    }
    next();
  });
};

const verifyCart = {
  checkIdUserinCart,
  checkIdCart,
};

module.exports = verifyCart;
