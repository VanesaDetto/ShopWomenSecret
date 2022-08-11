const ProductRoutes = require('express').Router();
const { getAllProducts, getProductByID, createProduct, updateProduct, removeProduct } = require('./products.controller');
const upload = require('../../middleware/file');
const { authorize } = require("../../middleware/auth");
const rateLimit = require('express-rate-limit');

const gameCreateRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
});

ProductRoutes.get('/getAll',[authorize], getAllProducts);
ProductRoutes.get('/productByID/:sku',[authorize], getProductByID);
ProductRoutes.post('/create', [authorize, gameCreateRateLimit], upload.single('images'), createProduct);
ProductRoutes.patch('/updateProduct/:id',[authorize], updateProduct);
ProductRoutes.delete('/removeProduct/:sku',[authorize], removeProduct);

module.exports = ProductRoutes;