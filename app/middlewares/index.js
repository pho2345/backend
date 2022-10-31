const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyBrand = require("./verifyBrand");
const verifyProduct = require("./verifyProduct");
const verifyCart = require("./verifyCart");
const verifyDetailCart = require("./verifyDetailCart");
const verifyBill = require("./verifyBill");
module.exports = {
  authJwt,
  verifySignUp,
  verifyBrand,
  verifyProduct,
  verifyCart,
  verifyDetailCart,
  verifyBill,
};
