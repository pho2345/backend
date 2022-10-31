const {
  verifyDetailCart,
  verifyCart,
  verifyProduct,
  authJwt,
} = require("../middlewares");
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
      authJwt.verifyToken,
      verifyCart.checkIdCart,
      verifyProduct.checkIdProduct,
      verifyDetailCart.checkProductInDetail,
    ],
    controller.insert
  );

  app.get("/api/detailcart", [authJwt.verifyToken], controller.find);

  app.delete(
    "/api/detailcart/delete",
    [
      authJwt.verifyToken,
      verifyDetailCart.checkIdCartInDetail,
      verifyDetailCart.checkMultiProductInDetail,
    ],
    controller.delete
  );

  app.get(
    "/api/detailcart/total",
    [authJwt.verifyToken, verifyDetailCart.checkIdCartInDetail],
    controller.sumtotal
  );

  app.post(
    "/api/detailcart/oneparttotal",
    [
      authJwt.verifyToken,
      verifyDetailCart.checkIdCartInDetail,
      verifyDetailCart.checkMultiProductInDetail,
    ],
    controller.onePartTotal
  );
};
