const mongoose = require('mongoose');
const { SIZES, COLORS, TYPE } = require('../../helpers/constants/products');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        images: { type: String, require: true },
        price: { type: Number, require: true},
        size: { type: String, enum: SIZES, require: true}, 
        colors: { type: String, enum: COLORS, require: true},
        types: { type: String, enum: TYPE, require: true},
        stock: { type: Number, require: true },
        sku: { type: String, unique: true, require: true}
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model( 'products', schema );