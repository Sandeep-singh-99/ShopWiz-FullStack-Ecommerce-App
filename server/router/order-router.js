const express = require('express');

const verifyToken = require('../middleware/jwt-verification');
const { getOrders, totalOrders, overAllOrders } = require('../controller/order-controller');

const router = express.Router();

router.route("/getAllOrders").get(verifyToken, getOrders)

router.route("/total-orders").get(verifyToken, totalOrders)

router.route("/overAllOrders").get(overAllOrders)

module.exports = router;