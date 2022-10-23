const { user } = require("../models");
const db = require("../models");
const Cart = db.cart;


checkIdUserinCart = (req, res, next) => {
 
    Cart.find( { user_id : [{ _id : req.userId }]}, "-user_id -total").exec((err, cart) => {
      
        if(cart.length){
          res.status(400).send({ message: "Cart exists" });
          return;
        }
        if(err){
          res.status(500).send({ message: err });
          return;
        }
       next();
      })
    
    }


const verifyCart = {
    checkIdUserinCart
};

module.exports = verifyCart;
