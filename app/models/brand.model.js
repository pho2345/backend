const mongoose = require("mongoose");
const Brand = mongoose.model(
    "Brand",
    new mongoose.Schema({
        namebrand: String
    }, {versionKey: false})
  );
  
  module.exports = Brand;