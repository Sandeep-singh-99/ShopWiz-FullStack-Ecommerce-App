const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        ref: 'Auth',
        type: String,
    },
    quantity: Number,
    productId: {
        ref: 'Product',
        type: String,
    }
}, {
    timestamps: true
})

const Cart = new model("Cart", cartSchema)

module.exports = Cart