const Products = require('./products.model');
const { setError } = require('../../helpers/utils/error');
const { deleteFile } = require('../../middleware/delete-file');
const { array } = require('../../middleware/file');
const { aletaroySku } = require('../../helpers/utils/aleatorySku');

const getAllProducts = async( req, res, next ) => {
    try {
        const products = await Products.find().sort({ createAt: 'desc' });
        return res.json({
            status: 200,
            message: 'All products',
            data: { products } ,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed recover all Products'));
    }
}

const getProductByID = async( req, res, next ) => {
    try {
        const { sku } = req.params;
        const product = await Products.find({ sku: sku});
        if( !product ) return next( setError(404, error.message || 'Product not found'));
        return res.json({
            status: 200,
            message: 'Recovered product by ID',
            data: product ,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed product by ID'));
    }
}

const createProduct = async( req, res, next ) => {
    try {
        const product = new Products( req.body );
        if( req.file ) product.images = req.file.path;
        product.sku = aletaroySku( product.colors, product.types, product.size );
        const productInDB = await product.save();
        return res.json({
            status: 201,
            message: 'Created product',
            data: product ,
        });
    } catch (error) {
        return next( setError( 500, error.message || 'Failed created new product'));
    }
}

const updateProduct = async( req, res, next ) => {
    try {
        const { id } = req.params;
        const product = new Products( req.body );
        product._id = id;
        if( req.file ) product.images = req.file.path;
        const updateProduct = await Products.findByIdAndUpdate( id, product );
        if( !updateProduct ) return next( setError(404, 'Product not found'));
        return res.json({
            status: 201,
            message: 'Update product',
            data: updateProduct ,
        })
    } catch (error) {
        return next( setError( 500, error.message || 'Failed update product'));
    }
}

const removeProduct = async( req, res, next ) => {
    try {
        const { sku } = req.params;
        const deletedProduct = await Products.findOneAndDelete( { sku: sku });
        if( deletedProduct.images ) deleteFile( deletedProduct.images )
        if( !deletedProduct ) return next( setError(404, 'Product not found'));
        return res.json({
            status: 200,
            message: 'Deleted product',
            data:  deletedProduct ,
        })
    } catch (error) {
        return next( setError( 500, error.message || ''));
    }
}

module.exports = { getAllProducts, getProductByID, createProduct, updateProduct, removeProduct };