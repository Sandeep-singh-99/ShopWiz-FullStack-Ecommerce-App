const crypto = require("crypto");
const axios = require("axios");
const Payment = require("../models/payment-model");
const Cart = require("../models/cart-model");
const Order = require("../models/order-model");
const NodeCache = require("node-cache");
const Product = require("../models/product-model");
const nodeCache = new NodeCache();

// PhonePe credentials
const PHONEPE_MERCHANT_ID = "PGTESTPAYUAT86";
const PHONEPE_SALT_KEY = "96434309-7796-489d-8924-ab56988a6076";
const PHONEPE_SALT_INDEX = "1";
const PHONEPE_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox"; 
const REDIRECT_URL = "http://localhost:5173/status";

const initiatePayment = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);
        
        const { cartItems, amount } = req.body;

        if (!cartItems?.length || !amount || amount <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid cart items or amount" 
            });
        }

        const merchantTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        const payload = {
            merchantId: PHONEPE_MERCHANT_ID,
            merchantTransactionId,
            merchantUserId: userId.toString(),
            amount: Math.round(amount * 100),
            redirectUrl: `${REDIRECT_URL}?transactionId=${merchantTransactionId}`,
            redirectMode: "REDIRECT",
            callbackUrl: `${REDIRECT_URL}?transactionId=${merchantTransactionId}`,
            paymentInstrument: { type: "PAY_PAGE" }
        };

        const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
        const stringToSign = `${base64Payload}/pg/v1/pay${PHONEPE_SALT_KEY}`;
        const xVerify = `${crypto.createHash("sha256")
            .update(stringToSign)
            .digest("hex")}###${PHONEPE_SALT_INDEX}`;

        const phonepeResponse = await axios.post(
            `${PHONEPE_BASE_URL}/pg/v1/pay`,
            { request: base64Payload },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerify,
                    "X-MERCHANT-ID": PHONEPE_MERCHANT_ID
                },
                timeout: 10000
            }
        );

        if (!phonepeResponse.data.success) {
            throw new Error("PhonePe API returned unsuccessful response");
        }

        const redirectUrl = phonepeResponse.data.data.instrumentResponse.redirectInfo.url;

        const payment = new Payment({
            userId,
            cartItems,
            merchantTransactionId,
            orderId,
            amount,
            status: "PENDING",
            paymentResponse: phonepeResponse.data
        });

        await payment.save();

        return res.status(200).json({ 
            success: true,
            redirectUrl,
            merchantTransactionId
        });
    } catch (error) {
        console.error("Payment initiation error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Payment initiation failed",
            error: error.message 
        });
    }
};


const checkPaymentStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;

        if (!transactionId) {
            return res.status(400).json({ success: false, message: "Transaction ID is required" });
        }

        const payment = await Payment.findOne({ 
            merchantTransactionId: transactionId,
            userId: req.user
        });

        if (!payment) {
            return res.status(404).json({ 
                success: false, 
                message: "Payment not found or unauthorized" 
            });
        }

        const stringToSign = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}${PHONEPE_SALT_KEY}`;
        const xVerify = `${crypto.createHash("sha256").update(stringToSign).digest("hex")}###${PHONEPE_SALT_INDEX}`;

        console.log('Checking PhonePe status for transaction:', transactionId);
        const phonepeRes = await axios.get(
            `${PHONEPE_BASE_URL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerify,
                    "X-MERCHANT-ID": PHONEPE_MERCHANT_ID
                },
            }
        );

        
        // Log the full PhonePe response to debug
        console.log('PhonePe Status Response:', JSON.stringify(phonepeRes.data, null, 2));

        // More comprehensive status checking
        let status;
        switch (phonepeRes.data.code) {
            case "PAYMENT_SUCCESS":
                status = "SUCCESS";
                break;
            case "PAYMENT_ERROR":
            case "PAYMENT_DECLINED":
            case "PAYMENT_REJECTED":
                status = "FAILED";
                break;
            case "PAYMENT_PENDING":
            case "AUTHORIZATION_PENDING":
            case "PAYMENT_INITIATED":
                status = "PENDING";
                break;
            default:
                console.log('Unhandled PhonePe status code:', phonepeRes.data.code);
                status = "PENDING";
        }

        // Update payment status
        payment.status = status;
        payment.paymentResponse = phonepeRes.data;
        await payment.save();

        // Create order if payment is successful
        if (status === "SUCCESS") {
            try {

                // Fetch product details for all items in cartItems
                const productIds = payment.cartItems.map(item => item.productId);
                const products = await Product.find({ _id: { $in: productIds } }).select('salesPrice');

                // Map products to a lookup object for easy access
                const productPriceMap = new Map(products.map(p => [p._id.toString(), p.salesPrice]));


                const order = await Order.create({
                    userId: payment.userId,
                    paymentId: payment._id,
                    items: payment.cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        // price: item.price || 0 
                        price: productPriceMap.get(item.productId.toString()) || 0
                    })),
                    totalAmount: payment.amount,
                    merchantTransactionId: payment.merchantTransactionId,
                    orderId: payment.orderId,
                    status: "CONFIRMED",
                });
                
                await Cart.deleteMany({ userId: req.user });
                nodeCache.del("allProducts");
                // console.log('Order created successfully:', order._id);
            } catch (orderError) {
                console.error('Order creation failed:', orderError);
                // You might want to handle this differently based on your needs
            }
        }

        

        return res.status(200).json({ 
            success: true, 
            status,
            payment: payment.toJSON(),
            phonepeResponse: phonepeRes.data // Include raw response for debugging
        });
    } catch (error) {
        console.error("Status check error:", error.response?.data || error.message);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to check payment status",
            error: error.message,
            errorDetails: error.response?.data
        });
    }
};



module.exports = {
    initiatePayment,
    checkPaymentStatus
};