const db = require("../models");
const Product = db.product;
const DetailCart = db.detailcart;
const DetailBill = db.detailbill;
checkNameProduct = (req, res, next) => {
  // console.log(req.body);
  Product.findOne({
    nameproduct: req.body.nameproduct,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Product is already in use!" });
      return;
    }
    next();
  });
};

checkIdProduct = (req, res, next) => {
  Product.findById(req.body.productId._id).exec((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (product) {
      req.price = product.price;
    }

    if (!product) {
      res.status(400).send({ message: "Failed! Product is not exists!" });
      return;
    }
    next();
  });
};

checkIdProductInDetailCartAndDtBill = (req, res, next) => {
  DetailCart.findOne({
    productId: req.body.productId._id,
  }).exec((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (product) {
      res.status(400).send({ message: "Can't delete product" });
      return;
    }
    DetailBill.findOne({
      productId: req.body.productId._id,
    }).exec((err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (product) {
        res.status(400).send({ message: "Can't delete product" });
        return;
      }
      next();
    });
    return;
  });
};

const verifyProduct = {
  checkNameProduct,
  checkIdProduct,
  checkIdProductInDetailCartAndDtBill,
};
module.exports = verifyProduct;
