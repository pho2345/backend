const mongoose = require("mongoose");

const DetailCart = mongoose.model(
  "DetailCart",
  new mongoose.Schema(
    {
      quantity: {
        type: Number,
        min: 0,
        required: true,
      },
      cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },

      price: {
        type: Number,
        min: 1,
      },
    },
    { versionKey: false }
  )
);

DetailCart.schema.path("quantity").validate(function (value) {
  if (value < 0) {
    return false;
  }
  return true;
}, "Product update failed");

module.exports = DetailCart;
