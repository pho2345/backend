const {
  authJwt,
  verifyDetailCart,
  verifyCart,
  verifyBill,
} = require("../middlewares");
const controller = require("../controllers/bill.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/bill/insert",
    [
      authJwt.verifyToken,
      verifyCart.checkIdCart,
      verifyDetailCart.checkMultiProductInDetail,
    ],
    controller.insert
  );

  //app.post("/api/bill/update", [], controller.updateTotal);

  app.get(
    "/api/bill",
    [authJwt.verifyToken, verifyBill.checkIdUserAndIdBill2],
    controller.find
  );
  app.patch(
    "/api/bill/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateStatus
  );
  app.post("/api/bill/test", [], controller.test);
};
