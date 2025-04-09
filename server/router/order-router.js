const express = require('express');
const getOrders = require('../controller/order-controller');
const verifyToken = require('../middleware/jwt-verification');

const router = express.Router();

router.route("/getAllOrders").get(verifyToken, getOrders)

module.exports = router;