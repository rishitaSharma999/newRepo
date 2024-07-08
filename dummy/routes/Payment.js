const express = require("express")
const router = express.Router()
const {paymentController1, paymentController2} =require("../controllers/Money_Logic")

router.post("/order", paymentController1)
router.post("/status", paymentController2)

module.exports = router