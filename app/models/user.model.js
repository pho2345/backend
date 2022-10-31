const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        maxlength: 60,
      },
      password: String,
      roles: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    },
    { versionKey: false }
  )
);

User.schema.path("email").validate(function (value) {
  if (value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    return true;
  }
  return false;
}, "email error");

User.schema.path("username").validate(function (value) {
  if (!value) {
    return false;
  }
  return true;
}, "username error");

module.exports = User;
