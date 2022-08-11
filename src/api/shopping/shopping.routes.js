const ShoppingRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const { getAllShopping, getTicketByID, createShopping, updateShopping, removeShopping } = require('../shopping/shopping.controller');

ShoppingRoutes.get('/getAll',[authorize], getAllShopping);
ShoppingRoutes.get('/getByTicket/:ticketID',[authorize], getTicketByID);
ShoppingRoutes.post('/create',[authorize], createShopping);
ShoppingRoutes.patch('/update/:id',[authorize], updateShopping);
ShoppingRoutes.delete('/delete/:ticketID',[authorize], removeShopping);

module.exports = ShoppingRoutes;