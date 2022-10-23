const mongoose = require('mongoose');

const DetailCart = mongoose.model(
    "DetailCart",
    new mongoose.Schema({
        quantity: Number,
        cartId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cart"
            },


        ],
        productId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        price : Number
    }, { versionKey: false })
)

module.exports = DetailCart;