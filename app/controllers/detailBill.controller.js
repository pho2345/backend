const { detailbill } = require("../models");
const db = require("../models");
const DetailBill = db.detailbill;
const DetailCart = db.detailcart;
const Product = db.product;
const controller = require("./detailCart.controller");

exports.test = async (req, res, idBill) => {
  const productList = req.body.productId.map((productid) => {
    return new Promise((rel, rej) => {
      DetailCart.find({
        cartId: req.cartId,
        productId: productid,
      })
        // .populate("productId")
        .exec(async (err, product) => {
          if (err) {
            return rej(err);
          }
          if (product) {
            return rel(product[0]);
          }
        });
    });
  });

  const productListhandle = await Promise.all(productList)
    .then((res) => res)
    .catch((err) => console.log(err));
  const productdata = productListhandle.map((e) => {
    return {
      bill_id: idBill,
      quantity: e.quantity,
      productId: e.productId,
      price: e.price,
    };
  });

  return productdata;
};

exports.insert = async (req, res) => {
  const data = await this.test(req, res, req.body.bill_id._id);
  const promisedetail = data.map((e) => {
    const detailbill = new DetailBill({
      ...e,
    });
    return new Promise((rel, rej) => {
      detailbill.save((err, detailbill) => {
        if (err) {
          return rej(err);
        }
        if (detailbill) {
          return rel(detailbill);
        }
      });
    });
  });

  const detailbill = await Promise.all(promisedetail);
  if (detailbill) {
    await controller.delete(req, res);
  }

  await res.end();
};

exports.find = async (req, res) => {
  DetailBill.find({
    bill_id: req.body.bill_id._id,
  })
    .populate("productId")
    .exec(async (err, detailbills) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (detailbills) {
        const product = detailbills.map((detailbill) => {
          return new Promise((rel, rej) => {
            Product.findOne(
              {
                _id: detailbill.productId,
              },
              "-quantity"
            )
              .populate("brand", "-_id")
              .exec((err, products) => {
                if (err) {
                  return rej(err);
                }
                if (products) {
                  products.quantity = detailbill.quantity;
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
};
