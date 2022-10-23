const { verifySignUp, authJwt, verifyCart } = require("../middlewares");
const controller = require("../controllers/cart.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post(
      "/api/cart/insert",
      [
        authJwt.verifyToken,
        verifyCart.checkIdUserinCart
      ],
      controller.insert
    );
    
    app.post(
      "/api/cart/update",
      [
       
      ],
      controller.updateTotal
    );

    app.get(
      "/api/cart",
      [
  
      ],
      controller.find
    );
  };
  