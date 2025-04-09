const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        ref: 'Auth',
        type: Schema.Types.ObjectId,
    },
    quantity: Number,
    productId: {
        ref: 'Product',
        type: Schema.Types.ObjectId,
    }
}, {
    timestamps: true
})

const Cart = new model("Cart", cartSchema)

module.exports = Cart