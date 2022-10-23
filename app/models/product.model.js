const mongoose = require('mongoose');

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        nameproduct: String,
        price : Number,
        quantity : Number,
        brand : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Brand"
            }
        ],
        image : String
    }, {versionKey: false})
)

module.exports = Product;