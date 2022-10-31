const { mongoose } = require("../models");
const db = require("../models");
const Brand = db.brand;

exports.insert = (req, res) => {
  const brand = new Brand({
    namebrand: req.body.namebrand,
  });

  brand.save((err, brand) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (brand) {
      res.send({ message: "Brand add succesfully!" });
      return;
    }
  });
};

exports.update = (req, res) => {
  Brand.updateOne(
    { namebrand: req.body.namebrand },
    { namebrand: req.body.nameset },
    (err, brand) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (brand) {
        res.send({ message: "Brand update succesfully!" });
        return;
      }
    }
  );
};

exports.delete = async (req, res) => {
  var brand_id = req.body._id;
  Brand.findByIdAndRemove(
    brand_id,
    { useFindAndModify: false },
    function (err, docs) {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (docs) {
        res.status(200).send({ message: "Brand delete succesfully!" });
      } else {
        res.status(400).send({ message: "éo có brand" });
      }
      return;
    }
  );
};

exports.find = async (req, res) => {
  Brand.find({ ...req.query }).exec((err, brand) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (brand) {
      res.status(200).send(brand);
    }

    res.end();
  });
};
