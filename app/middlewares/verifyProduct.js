const db = require("../models");
const Product = db.product;

checkNameProduct = (req, res, next) => {
    // console.log(req.body);
    Product.findOne({
        nameproduct: req.body.nameproduct
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

checkIdproductInBill = (res ,req, next) => {
      
};

const verifyProduct = {
  checkNameProduct,
};
module.exports = verifyProduct;
