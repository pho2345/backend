const { verifyDetailCart } = require("../middlewares");
const controller = require("../controllers/detailCart.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/detailcart/insert",
    [
      verifyDetailCart.checkIdCart,
      verifyDetailCart.checkIdProduct,
      verifyDetailCart.checkProductInDetail,
    ],
    controller.insert
  );

  app.post("/api/detailcart", [], controller.find);

  app.post(
    "/api/detailcart/delete",
    [
      verifyDetailCart.checkIdCartInDetail,
      verifyDetailCart.checkMultiProductInDetail,
    ],
    controller.delete
  );
};
