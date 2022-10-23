const { user } = require("../models");
const db = require("../models");
const User = db.user;


checkIdUserinCart = (req, res, next) => {
  User.findById(
    { _id : req.body.user_id[0]._id},
    { useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        res.status(400).send({ message: "User not exists" });
        return;
      }

      next();
    }
  )
}

const verifySignUp = {

    checkIdUserinCart
};

module.exports = verifySignUp;
