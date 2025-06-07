// routes/paymentRoutes.js
const express = require("express");

const verifyToken = require("../middleware/jwt-verification");
const {
  initiatePayment,
  checkPaymentStatus,
  getTotoalAmount,
} = require("../controller/payment-controller");

const router = express.Router();

router.route("/initiate").post(verifyToken, initiatePayment);
router.route("/status/:transactionId").get(verifyToken, checkPaymentStatus);

module.exports = router;
