const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      nameproduct: {
        type: String,
        required: true,
        maxlength: 100,
      },
      price: {
        type: Number,
        min: 1,
      },
      quantity: {
        type: Number,
        // min: 1,
      },
      brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
      image: String,
    },
    { versionKey: false }
  )
);

Product.schema.path("quantity").validate(function (value) {
  if (value < 0) {
    return false;
  }
  return true;
}, "failed quantity");

module.exports = Product;
