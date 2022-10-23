const { detailcart, product } = require("../models");
const db = require("../models");
const DetailCart = db.detailcart;
const Product = db.product;


exports.insert = (req, res) => {
  if (req.check) {
    DetailCart.findOneAndUpdate({
      cartId: req.body.cartId,
      productId: req.body.productId
    }, { quantity: req.quantity + req.body.quantity }, (err, detailcart) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (detailcart) {
        res.status(200).send({ message: "Update success" });
      }
      res.end();
    })
  }
  else {
    const detailcart = new DetailCart({
      ...req.body,
      price: req.price
    });

    detailcart.save((err, detailcart) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (detailcart) {
        res.status(200).send({ message: "DetailCart add succesfully!" });
        return;
      }
      res.end();
    });

  }
};


exports.find =  (req, res) => {
  DetailCart.find({
   ...req.body.cartId
  })
    .populate("productId")
    .exec( async (err, detailcarts) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      if (detailcarts) {
        const product = detailcarts.map((detailcart) => {
          return new Promise((rel, rej) => {
            Product.findOne({
              _id : detailcart.productId
            })
            .populate("brand")
            .exec((err, products) => {
              if (err) { 
                return rej(err);
              }
              if (products){
                return rel(products)
              }
    
            })
          })
           
        });
        const  data = await Promise.all(product);
        res.status(200).send(data);
        res.end();
      }
    });
}


exports.delete = async ( req, res) => {
  // DetailCart.deleteMany({
  //   cartId : 
  // })
 
  const deleteMani = req.body.productId.map((product) => {
      return new Promise((rel, rej) => {
          DetailCart.findOneAndDelete({ 
            cartId : req.body.cartId,
            productId : product
          }).exec((err, deleted) => {
            if (err) {
              return rej(err);
            }
            if(deleted) {
             return  rel(deleted);
            }
            if(!deleted){
             return rej("faild");
            }
            
          })
      })
  })

  const data = await Promise.all(deleteMani).then(res => res).catch(err => err);
  console.log(data);
  res.end();
}
