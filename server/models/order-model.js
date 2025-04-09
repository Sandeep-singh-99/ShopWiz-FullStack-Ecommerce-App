// models/order-model.js
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
        index: true
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
        index: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {  
            type: Number,
            required: true,
            min: 0
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    merchantTransactionId: {
        type: String,
        required: true,
        index: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PENDING",
        index: true
    },
}, { 
    timestamps: true,
});

const Order = model("Order", orderSchema);

module.exports = Order;