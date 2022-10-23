//const { verifyBrand } = require("../middlewares");
const controller = require("../controllers/product.controller");
const { verifyProduct } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get(
      "/api/product",
      [
  
      ],
      controller.find
    );

    app.post(
        "/api/product/insert",
        [
          
        ],
        controller.insert
      );

      app.post(
        "/api/product/update",
        [ 
          verifyProduct.checkNameProduct
        ],
        controller.update
      );
  };
  