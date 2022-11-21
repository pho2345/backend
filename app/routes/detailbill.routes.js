//const expressvali = require("express-validation");
const {
  verifyBill,
  verifyDetailCart,
  verifyCart,
  authJwt,
} = require("../middlewares");

const controller = require("../controllers/detailBill.controller");
// console.log(expressvali);
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/detailbill/insert",
    [
      authJwt.verifyToken,
      verifyCart.checkIdCart,
      verifyDetailCart.checkMultiProductInDetail,
      verifyBill.checkIdBill,
    ],
    controller.insert
  );

  app.get(
    "/api/detailbill/:id",
    [authJwt.verifyToken, verifyBill.checkIdUserAndIdBill],
    controller.find
  );

  //   app.post(
  //     "/api/detailcart/delete",
  //     [
  //       verifyDetailCart.checkIdCartInDetail,
  //       verifyDetailCart.checkMultiProductInDetail,
  //     ],
  //     controller.delete
  //   );

  //   app.post(
  //     "/api/detailcart/total",
  //     [verifyDetailCart.checkIdCartInDetail],
  //     controller.sumtotal
  //   );

  //   app.post(
  //     "/api/detailcart/oneparttotal",
  //     [
  //       verifyDetailCart.checkIdCartInDetail,
  //       verifyDetailCart.checkMultiProductInDetail,
  //     ],
  //     controller.onePartTotal
  //   );
};
