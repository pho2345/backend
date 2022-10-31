const db = require("../models");
const Cart = require("../models/cart.model");
const DetailCart = db.detailcart;
const Product = db.product;
const ObjectId = require("mongoose").Types.ObjectId;

exports.insert = (req, res) => {
  if (req.check) {
    const opts = { runValidators: true };
    DetailCart.findOneAndUpdate(
      {
        cartId: req.cartId,
        productId: req.body.productId,
      },
      { quantity: req.quantity + req.body.quantity },
      opts,
      (err, detailcart) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (detailcart) {
          res.status(200).send({ message: "Update success" });
        }
        res.end();
      }
    );
  } else {
    const detailcart = new DetailCart({
      ...req.body,
      cartId: {
        _id: req.cartId,
      },
      price: req.price,
    });
    const err = detailcart.validateSync();
    //console.log(err);

    detailcart.save((err, detailcart) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (detailcart) {
        res.status(200).send({ message: "DetailCart add succesfully!" });
        return;
      }
      res.end();
    });
  }
};

exports.find = async (req, res) => {
  const cartId = await Cart.findOne({ user_id: req.userId }).exec();

  DetailCart.find({
    cartId: cartId._id,
  })
    .populate("productId")
    .exec(async (err, detailcarts) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (detailcarts) {
        const product = detailcarts.map((detailcart) => {
          return new Promise((rel, rej) => {
            Product.findOne(
              {
                _id: detailcart.productId,
              },
              "-quantity"
            )
              .populate("brand", "-_id")
              .exec((err, products) => {
                if (err) {
                  return rej(err);
                }
                if (products) {
                  products.quantity = detailcart.quantity;
                  return rel(products);
                }
              });
          });
        });
        const data = await Promise.all(product);
        res.status(200).send(data);
        res.end();
      }
    });
  /// async await
  /* 
   try{
      var detailcarts = await DetailCart.find({
      ...req.body,
    })
      .populate("productId")
      .exec();

 const product = detailcarts.map((detailcart) => {
      return new Promise((rel, rej) => {
        Product.findOne(
          {
            _id: detailcart.productId,
          },
          "-quantity"
        )
          .populate("brand", "-_id")
          .exec((err, products) => {
            if (err) {
              return rej(err);
            }
            if (products) {
              products.quantity = detailcart.quantity;
              return rel(products);
            }
          });
      });
    });
    const data = await Promise.all(product);
    res.status(200).send(data);
    res.end();
      
   }
   catch(error){
       res.status(500).send({ message: err });
   }*/
};

exports.delete = async (req, res) => {
  const deleteMani = req.body.productId.map((product) => {
    return new Promise((rel, rej) => {
      DetailCart.findOneAndDelete({
        cartId: req.cartId,
        productId: product,
      }).exec((err, deleted) => {
        if (err) {
          return rej(err);
        }
        if (deleted) {
          return rel(deleted);
        }
        if (!deleted) {
          return rej("faild");
        }
      });
    });
  });

  const data = await Promise.all(deleteMani)
    .then((res) => res)
    .catch((err) => err);
  await res.status(200).send({ message: "data" });
  await res.end();
};

exports.sumtotal = async (req, res) => {
  var data = await DetailCart.aggregate([
    {
      $match: {
        cartId: ObjectId(req.cartId),
      },
    },
    {
      $project: {
        result: { $multiply: ["$price", "$quantity"] },
      },
    },
    {
      $group: {
        _id: null,
        sum: { $sum: "$result" },
      },
    },
  ]);

  res.status(200).send({ total: data[0].sum });
  res.end();
};

exports.onePartTotal = async (req, res) => {
  const sum = req.body.productId.map((product) => {
    return new Promise((rel, rej) => {
      var data = DetailCart.aggregate([
        {
          $match: {
            cartId: ObjectId(req.cartId),
            productId: {
              $in: [ObjectId(product)],
            },
          },
        },
        {
          $project: {
            result: { $multiply: ["$price", "$quantity"] },
          },
        },
        {
          $group: {
            _id: null,
            sum: { $sum: "$result" },
          },
        },
      ]);
      return rel(data);
    });
  });

  var initial = 0;
  const total = await Promise.all(sum);

  const totalbil = total.map((e) => {
    return new Promise((rel, rej) => {
      return rel(e[0].sum);
    });
  });
  const datatotal = await Promise.all(totalbil);
  datatotal.forEach((element) => {
    initial += element;
  });

  await res.send({ total: initial });
  await res.end();
};
