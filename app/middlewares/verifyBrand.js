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

    if (brand) {
      if (req.body.nameset) {
        Brand.findOne({
          namebrand: req.body.nameset,
        }).exec((err, brandnew) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (brandnew) {
            res
              .status(400)
              .send({ message: "Failed! brand name is already in use!" });
            return;
          }
          next();
        });
      }
      else{
        res.status(400).send({ message: "Failed! brandname is already in use!" });
        return;
      }
      
    }
    next();

    // Email
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
  checkNameBrand
 
};
module.exports = verifyBrand;
