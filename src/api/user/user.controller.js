const User = require('./user.model');
const bcrypt = require('bcrypt');
const { createToken } = require('../../helpers/utils/token-action');
const { setError } = require('../../helpers/utils/error');

const userByEmail = async( req, res, next ) => {
    try {
        const { email } = req.params;
        if( email != req.user.email ) return next( setError( 403, 'Email not found'));
        const user = await (User.find( {email: email} )).populate('shopping');
        if( !user ) return next( setError(404, 'User not found'));
        return res.json({
            status: 200,
            message: 'Email founding',
            data: { user },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed recovered Users for email'));
    }
}

const register = async( req, res, next ) => {
    try {
        const newUser = new User( req.body );
        const emailExist = await User.findOne({ email: newUser.email });
        if( emailExist ) return next( setError( 409, 'This email already existed'));
        const userInDB = await newUser.save();
        return res.json({
            status: 201,
            message: 'Email founding',
            data: { userInDB },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed create user'));
    }
}

const login = async( req, res, next ) => {
    try {
        const userInDB = await (User.findOne({ email: req.body.email })).populate('shopping');;
        if( !userInDB ) return next( setError(404, 'User not found'));

        if( bcrypt.compareSync( req.body.password, userInDB.password )){
            const token = createToken( userInDB._id, userInDB.email );
            return res.status(200).json({ userInDB, token });
        } else {
            return next( setError( 401, 'Invalid Password'));
        }
    } catch (error) {
        return next( setError(500, error.message || 'Unexpected error login'));
    }
}

const update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = new User(req.body);
      user._id = id;
      const updatedUser = await User.findByIdAndUpdate( id, user );
      if (!updatedUser) return next(setError(404, 'User not found'));
      return res.json({
        status: 201,
        message: 'Updated User',
        data: { updatedUser }
      })
  
    } catch (error) {
      return next(setError(500, error.message || 'Failed updated user'));
    }
  }

const remove = async( req, res, next ) => {
    try {
        const { email } = req.params;
        const deletedUser = await User.findOneAndDelete( {email: email} );
        if( !deletedUser ) return next( setError(404, 'User not found'));
        return res.json({
            status: 200, 
            message: 'Deleted user',
            data: { deletedUser },
        })
    } catch (error) {
        return next( setError(500, error.message || 'Failed to removed user'));
    }
}

module.exports = { userByEmail, register, login, update, remove };