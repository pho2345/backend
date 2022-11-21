const { user } = require("../models");
const db = require("../models");
const Bill = db.bill;
const User = db.user;
const Role = db.role;

checkIdBill = (req, res, next) => {
  Bill.findById(req.body.bill_id._id).exec((err, bill) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!bill) {
      res.status(404).send({ message: "Bill not exists" });
      return;
    }
    next();
  });
};
checkIdUserAndIdBill = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (roles[0].name === "admin") {
          req.checkSeenDetailBill = true;
          next();
          return;
        }

        Bill.findOne({
          _id: req.params.id,
          user_id: req.userId,
        }).exec((err, bill) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!bill) {
            res.status(404).send({ message: "Faild" });
            return;
          }
          next();
        });

        return;
      }
    );
  });
};

const verifyBill = {
  checkIdBill,
  checkIdUserAndIdBill,
};

module.exports = verifyBill;
