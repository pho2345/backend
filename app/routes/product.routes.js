//const { verifyBrand } = require("../middlewares");
const controller = require("../controllers/product.controller");
const { verifyProduct, verifyBrand } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/product", [], controller.find);

  app.post(
    "/api/product/insert",
    [verifyBrand.checkIdBrand],
    controller.insert
  );

  app.patch("/api/product/update", [], controller.update);

  app.delete(
    "/api/product/delete",
    [verifyProduct.checkIdProductInDetailCartAndDtBill],
    controller.delete
  );
};
