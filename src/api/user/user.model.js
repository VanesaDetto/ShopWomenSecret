const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../helpers/utils/error');
const { validationPassword } = require('../../helpers/utils/util');
const GENDERS = require('../../helpers/constants/genders');

const Schema = mongoose.Schema;

const schema = new Schema(
    {
        email: { type: String, unique: true, required: true},
        password: { type: String, required: true},
        name: { type: String, required: true},
        surname: { type: String, required: true},
        dateOfBirth: { type: String},
        gender: { type: String, enum: GENDERS},
        shopping: [{ type: Schema.Types.ObjectId, ref: 'shopping'}],
    },
    {
        timestamps: true,
    }
);

schema.pre( 'save', function(next) {
    if(!validationPassword( this.password )) return next(setError(400, 'INVALID PASSWORD'));
    this.password = bcrypt.hashSync( this.password, 16 );
    next();
});

module.exports = mongoose.model( 'users', schema );