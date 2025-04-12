const express = require('express');

const verifyToken = require('../middleware/jwt-verification');
const { getOrders, totalOrders } = require('../controller/order-controller');

const router = express.Router();

router.route("/getAllOrders").get(verifyToken, getOrders)

router.route("/total-orders").get(verifyToken, totalOrders)

module.exports = router;