const { verifyBrand } = require("../middlewares");
const controller = require("../controllers/brand.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post(
      "/api/brand/insert",
      [
        verifyBrand.checkNameBrand
      ],
      controller.insert
    );
    
    app.post(
      "/api/brand/update",
      [
        verifyBrand.checkNameBrand
      ],
      controller.update
    );

    app.delete(
      "/api/brand/delete",
      [
  
      ],
      controller.delete
    );

    app.get(
      "/api/brand",
      [
  
      ],
      controller.find
    );
  };
  