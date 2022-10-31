const { user } = require("../models");
const db = require("../models");
const Bill = db.bill;

checkIdBill = (req, res, next) => {
  Bill.findById(req.body.bill_id._id).exec((err, cart) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!cart) {
      res.status(500).send({ message: "Bill not exists" });
      return;
    }
    next();
  });
};

const verifyBill = {
  checkIdBill,
};

module.exports = verifyBill;
