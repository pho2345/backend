const { detailcart } = require("../models");
const db = require("../models");
const DetailCart = db.detailcart;
const Product = db.product;
const Cart = db.cart;

checkIdCartInDetail = async (req, res, next) => {
  const cartId = await Cart.findOne({ user_id: req.userId }).exec();
  req.cartId = cartId._id;
  DetailCart.findOne({
    cartId: req.cartId,
  }).exec((err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!cart) {
      res.status(500).send({ message: "Cart not exists in Detail" });
      return;
    }
    next();
  });
};

checkProductInDetail = (req, res, next) => {
  DetailCart.findOne({
    cartId: req.cartId,
    productId: req.body.productId,
  }).exec((err, detailcart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (detailcart) {
      req.check = true;
      req.quantity = detailcart.quantity;
    }

    if (!detailcart) {
      req.check = false;
    }

    next();
  });
};

checkMultiProductInDetail = async (req, res, next) => {
  const promise = req.body.productId.map((product) => {
    return new Promise((rel, rej) => {
      DetailCart.findOne({
        cartId: req.cartId,
        productId: product,
      }).exec((err, detailcart) => {
        if (err || !detailcart) {
          return rej("failed");
        }

        if (detailcart) {
          return rel(detailcart);
        }
      });
    });
  });

  const data = await Promise.all(promise)
    .then((res) => res)
    .catch((err) => err);
  if (data === "failed") {
    res.status(500).send({ message: "Product not exist in Cart" });
    return;
  }
  next();
};

const verifyDetailCart = {
  checkIdCartInDetail,
  checkProductInDetail,
  checkMultiProductInDetail,
};
module.exports = verifyDetailCart;
