const Shopping = require('./shopping.model');
const { setError } = require('../../helpers/utils/error');

const getAllShopping = async( req, res, next ) => {
    try {
        const shopping = await Shopping.find().populate('products');
        return res.json({
            status: 200,
            message: 'Recovered all Shopping',
            data: { shopping },
        })
    } catch (error) {
        return next( setError(500, 'Failed recovered all shoppings'));
    }
}

const getTicketByID = async( req, res, next ) => {
    try {
        const { ticketID } = req.params;
        const shopping = await Shopping.find( {ticketID: ticketID} );
        if(!shopping) return next( setError( 404, 'Ticket not found'));
        return res.json({
            status: 200,
            message: 'Recovered ticket by ID',
            data: { shopping }
        })
    } catch (error) {
        return next( setError(500, 'Failed get shopping by ID'));
    }
}

const createShopping = async( req, res, next ) => {
    try {
        const newShopping = new Shopping( req.body );
        if( newShopping.ticketID ){
            const newShoppingInDB = await newShopping.save();
            return res.json({
                status: 201,
                message: 'Create new Shopping',
                data: { newShoppingInDB }
            });
        }
    } catch (error) {
        return next( setError(500, 'Failed create new Shopping'));
    }
}

const updateShopping = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const shopping = new Shopping(req.body);
        shopping._id = id;
        const updateShopping = await Shopping.findByIdAndUpdate( id, shopping );
        if( !updateShopping ) return next( setError(404, 'Shopping not found'));
        return res.json({
            status: 201,
            message: 'Shopping updated',
            data: { updateShopping },
        })
    } catch (error) {
        return next( setError(500, 'Failed update Shopping'));
    }
}

const removeShopping = async( req, res, next ) => {
    try {
        const { ticketID } = req.params;
        const deletedTicket = await Shopping.findOneAndDelete({ ticketID: ticketID });
        if( !deletedTicket ) return next( setError(404, 'Tickect not found'));
        return res.json({
            status: 200,
            message: 'Deleted ticket',
            data: { deletedTicket },
        })
    } catch (error) {
        return next( setError(500, 'Failed delete Shopping'));
    }
}

module.exports = { getAllShopping, getTicketByID, createShopping, updateShopping, removeShopping };