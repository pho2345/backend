const db = require("../models");
const Product = db.product;
const Brand = db.brand;
const ObjectId = require("mongoose").Types.ObjectId;
exports.find = async (req, res) => {
  var page = req.query.page ? req.query.page : 1;
  delete req.query?.page;

  const ex = new RegExp(req.query.nameproduct, "i");
  const array = req.query.brands
    ? req.query.brands.split(",").map((e) => ObjectId(e))
    : [];
  const filter = req.query.brands
    ? {
        //nameproduct: ex,
        brand: {
          $in: array,
        },
      }
    : {
        //nameproduct: ex,
      };

  if (req.query._id) {
    filter._id = req.query._id;
  }
  if (req.query.nameproduct) {
    filter.nameproduct = ex;
  }

  Product.find(filter)
    .limit(8)
    .skip((page - 1) * 8)
    .populate("brand", "-_id")
    .exec((err, product) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      Product.find(filter).count((err, count) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.status(200).send({
          value: product,
          count: count,
        });
        res.end();
        return;
      });
    });

  // Use aggregate
  /* const array = req.query.brands.split(",").map((e) => ObjectId(e));
  const ex = new RegExp(req.query.nameproduct, "i");
  var data = await Product.aggregate([
    {
      $match: {
        nameproduct: ex,
        brand: {
          $in: array,
        },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $count: "count",
    },
    {
      $skip: (page - 1) * 8,
    },
    {
      $limit: 2,
    },
  ]);
  
   var count  = await Product.aggregate([
    {
      $match: {
        nameproduct: ex,
        brand: {
          $in: array,
        },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $count: "count",
    }
    
  ]);*/
  // res.end();
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
  Product.findByIdAndUpdate(
    idProduct,
    { $set: { ...req.body.productSet } },
    { useFindAndModify: false, runValidators: true },
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
  var product_id = req.body.productId._id;
  Product.findByIdAndRemove(
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
