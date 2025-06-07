const express = require('express');

const verifyToken = require('../middleware/jwt-verification');
const { getOrders, totalOrders, overAllOrders, getTotoalAmount, topSellingProducts } = require('../controller/order-controller');

const router = express.Router();

router.route("/getAllOrders").get(verifyToken, getOrders)

router.route("/total-orders").get(verifyToken, totalOrders)

router.route("/overAllOrders").get(overAllOrders)

router.route("/total-amount").get(getTotoalAmount)

router.route("/top-selling-products").get(topSellingProducts)

module.exports = router;