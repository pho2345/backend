const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema(
    {
      total: {
        type: Number,
        min: 0,
        //require: true,
        default: 0,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { versionKey: false }
  )
);

module.exports = Cart;
