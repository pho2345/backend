const mongoose = require("mongoose");

const DetailBill = mongoose.model(
  "DetailBill",
  new mongoose.Schema(
    {
      quantity: {
        type: Number,
        min: 1,
        required: true,
      },
      bill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill",
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

DetailBill.schema.path("quantity").validate(function (value) {
  if (value < 0) {
    return false;
  }
  return true;
}, "Product update failed");

module.exports = DetailBill;
