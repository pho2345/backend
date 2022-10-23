const db = require("../models");
const Product = db.product;
exports.find = (req, res) => {
   
  var  page = req.query.page ?  req.query.page : 1 ;
  delete req.query?.page;

  Product.find({ ...req.query })
    .limit(1)
    .skip((page-1) * 8)
    .populate("brand", "-_id")
    .exec((err, product) => {
      
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Product.count((err, count ) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        
        res.status(200).send({
            value : product,
            count : count 
         });
        return

      })
      
      
    });
};

exports.insert = (req, res) => {
  const product = new Product({
    ...req.body,
  });
  product.save((err, product) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (product) {
      res.status(200).send({ message: "Product add succesfully!" });
      return;
    }
  });
};

exports.update = (req, res) => {
  var idProduct = req.body._id;
  var productSet = {
    ...req.body,
  };
  delete productSet._id;

  Product.findByIdAndUpdate(
    idProduct,
    { $set: productSet },
    { useFindAndModify: false },
    (err, docs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (docs) {
        res.status(200).send({ message: "Product update successfully" });
      } else {
        res.status(400).send({ message: "Not find product" });
      }
      return;
    }
  );
};

exports.delete = async (req, res) => {
  var product_id = req.body._id;
  Brand.findByIdAndRemove(
    product_id,
    { useFindAndModify: false },
    (err, docs) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (docs) {
        res.status(200).send({ message: "Product delete succesfully!" });
      } else {
        res.status(400).send({ message: "Not find product" });
      }
      return;
    }
  );
};
