const crypto = require("crypto");
const axios = require("axios");
const Payment = require("../models/payment-model");
const Cart = require("../models/cart-model");

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
        console.log('checkPaymentStatus - Params:', req.params);
        const { transactionId } = req.params;

        if (!transactionId) {
            console.log('checkPaymentStatus - No transactionId');
            return res.status(400).json({ success: false, message: "Transaction ID is required" });
        }

        console.log('checkPaymentStatus - Searching payment for:', { transactionId, userId: req.user });
        const payment = await Payment.findOne({ 
            merchantTransactionId: transactionId,
            userId: req.user
        });
        console.log('checkPaymentStatus - Payment found:', payment);

        if (!payment) {
            console.log('checkPaymentStatus - No payment found');
            return res.status(404).json({ 
                success: false, 
                message: "Payment not found or unauthorized" 
            });
        }

        // await Cart.deleteMany({ userId: req.user });

        const stringToSign = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}${PHONEPE_SALT_KEY}`;
        const xVerify = `${crypto.createHash("sha256").update(stringToSign).digest("hex")}###${PHONEPE_SALT_INDEX}`;

        console.log('checkPaymentStatus - Fetching PhonePe status');
        const phonepeRes = await axios.get(
            `${PHONEPE_BASE_URL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerify,
                    "X-MERCHANT-ID": PHONEPE_MERCHANT_ID
                },
                timeout: 10000
            }
        );

        const status = phonepeRes.data.code === "PAYMENT_SUCCESS" ? "SUCCESS" : 
                      phonepeRes.data.code === "PAYMENT_ERROR" ? "FAILED" : "PENDING";

        payment.status = status;
        payment.paymentResponse = phonepeRes.data;
        await payment.save();

        console.log('checkPaymentStatus - Completed:', { status });
        return res.status(200).json({ 
            success: true, 
            status, 
            payment: payment.toJSON() 
        });
    } catch (error) {
        console.error("Status check error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to check payment status",
            error: error.message 
        });
    }
};




module.exports = {
    initiatePayment,
    checkPaymentStatus
};