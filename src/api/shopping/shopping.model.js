const mongoose = require('mongoose');
const PAYMENTS = require('../../helpers/constants/payments');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        date: { type: String },
        ticketID: { type: Number, unique: true, require: true,},
        products: [{ type: Schema.Types.ObjectId, ref: 'products'}],
        amount: { type: Number, require: true }, 
        payment: { type: String, enum: PAYMENTS, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model( 'shopping', schema );