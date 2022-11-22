const db = require("../models");
const Bill = db.bill;
const DetailCart = db.detailcart;
const Product = db.product;
const ObjectId = require("mongoose").Types.ObjectId;

exports.insert = async (req, res) => {
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

  try {
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

    // await res.send({ total: initial });
    // await res.end();

    const bill = new Bill({
      total: initial,
      user_id: {
        _id: req.userId,
      },
    });

    const createbill = await bill.save();
    const idBill = createbill._id;
    //await this.test(req, res, idBill);
    await res.status(200).send({ idBill });
  } catch (error) {
    res.status(500).send({ message: error });
  }

  // if (createbill.errors) {
  //   console.log("data");
  // }
  // await res.send({ message: "data" });
  // await res.end();
};

// exports.updateTotal = (req, res) => {
//   var idBill = req.body._id;
//   var total = req.body.total;
//   Bill.findByIdAndUpdate(
//     idBill,
//     { $set: { total: total } },
//     { useFindAndModify: false },
//     (err, docs) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }
//       if (docs) {
//         res.status(200).send({ message: "Bill update successfully" });
//       } else {
//         res.status(400).send({ message: "Not find Bill" });
//       }
//       return;
//     }
//   );
// };

exports.find = async (req, res) => {
  var filter = {};
  if (!req?.checkSeenDetailBill) {
    filter.user_id = req.userId;
    console.log("user");
  }
  Bill.find(filter).exec((err, bill) => {
    if (bill) {
      res.status(200).send(bill);
    }
    if (err) {
      res.status(500).send({ message: err });
    }
    return;
  });
};

exports.updateStatus = async (req, res) => {
  Bill.updateOne(
    {
      user_id: { _id: req.userId },
      _id: req.body._id,
    },
    { $set: { status: req.body.status } }
  ).exec((err, bill) => {
    if (bill) {
      res.status(200).send({ message: "update status success" });
    }
    if (err) {
      res.status(500).send({ message: err });
    }
    return;
  });
};

exports.test = async (req, res, idBill) => {
  const productList = req.body.productId.map((productid) => {
    return new Promise((rel, rej) => {
      DetailCart.find({
        cartId: req.body.cartId._id,
        productId: productid,
      })
        // .populate("productId")
        .exec(async (err, product) => {
          if (err) {
            return rej(err);
          }
          if (product) {
            //delete product._id;
            // delete product[0].cartId;
            //product[0].bill_id = idBill;

            return rel(product[0]);
          }
        });
    });
  });

  try {
    const productListhandle = await Promise.all(productList);
    const productdata = productListhandle.map((e) => {
      return {
        bill_id: idBill,
        quantity: e.quantity,
        productId: e.productId,
        price: e.price,
      };
    });
    console.log(productdata);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
