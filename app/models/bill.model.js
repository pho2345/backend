const mongoose = require("mongoose");

const Bill = mongoose.model(
  "Bill",
  new mongoose.Schema(
    {
      total: {
        type: Number,
        require: true,
        min: 0,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
      status: {
        type: Number,
        require: true,
        min: 0,
        max: 4,
        default: 0,
      },
    },
    { versionKey: false }
  )
);

Bill.schema.path("total").validate(function (value) {
  if (!value) {
    return false;
  }
  return true;
}, "total faild");

module.exports = Bill;
