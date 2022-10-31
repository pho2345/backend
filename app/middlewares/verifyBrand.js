const db = require("../models");
const Brand = db.brand;

checkNameBrand = (req, res, next) => {
  Brand.findOne({
    namebrand: req.body.namebrand,
  }).exec((err, brand) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (brand && req.body.nameset) {
      if (req.body.nameset) {
        Brand.findOne({
          namebrand: req.body.nameset,
        }).exec((err, brandnew) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (brandnew) {
            res.status(400).send({
              message: "Failed! brand name is already or  not exists!!",
            });
            return;
          }
        });
        return;
      } else {
        res
          .status(400)
          .send({ message: "Failed! brandname is already or not exists!" });
        return;
      }
    }
    if (!brand && req.body.nameset) {
      res.status(400).send({
        message: "Failed! brand name is already or  not exists!!",
      });
      return;
    }
    next();

    // Email
  });
};

checkIdBrand = (req, res, next) => {
  Brand.findById(req.body.brand._id).exec((err, brand) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!brand) {
      res.status(400).send({ message: "brand not exists" });
      return;
    }
    next();
  });
};

// checksetNameBrand = (req, res, next) => {
//   Brand.findOne({
//     namebrand: req.body.nameset,
//   }).exec((err, brand) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (brand) {
//       res.status(400).send({ message: "name new Failed" });
//       return;
//     }
//     next();
//   });
// };

const verifyBrand = {
  checkNameBrand,
  checkIdBrand,
};
module.exports = verifyBrand;
