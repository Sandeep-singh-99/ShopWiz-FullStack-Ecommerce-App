// // models/Payment.js
// const { Schema, model } = require("mongoose");

// const paymentSchema = new Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: "Auth",
//         required: true,
//     },
//     cartItems: [{
//         productId: {
//             type: Schema.Types.ObjectId,
//             ref: "Product",
//             required: true,
//         },
//         quantity: {
//             type: Number,
//             required: true,
//         },
//     }],
//     merchantTransactionId: {
//         type: String,
//         unique: true,
//         index: true,
//     },
//     orderId: {
//         type: String,
//         unique: true,
//         index: true, 
//     },
    
//     amount: {
//         type: Number,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ["PENDING", "SUCCESS", "FAILED"],
//         default: "PENDING",
//     },
//     paymentResponse: {
//         type: Object,
//     },
// }, { timestamps: true });

// const Payment = model("Payment", paymentSchema);

// module.exports = Payment;


const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
        index: true
    },
    cartItems: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    merchantTransactionId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    orderId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
        index: true
    },
    paymentResponse: {
        type: Schema.Types.Mixed
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true }
});

module.exports = model("Payment", paymentSchema);