const mongoose = require("mongoose");
const Brand = mongoose.model(
  "Brand",
  new mongoose.Schema(
    {
      namebrand: {
        type: String,
        required: true,
        minlength: 2,
      },
    },
    { versionKey: false }
  )
);

module.exports = Brand;
