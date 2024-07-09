const express = require("express");
const router = express.Router();

const {
  paymentController1,
  paymentController2,
} = require("../controllers/MoneyLogic");

router.post("/order", paymentController1);
router.post("/status", paymentController2);

router.get("/success", (req, res) => {
  res.render("success"); // render a success page
});

router.get("/fail", (req, res) => {
  res.render("fail"); // render a fail page
});

module.exports = router;
