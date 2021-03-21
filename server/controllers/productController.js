import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// @desc   Fetch all products
// @route  GET /api/products
// @access Public route
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})

    res.json(products)
})



// @desc   Fetches single product
// @route  GET /api/products/:id
// @access Public route
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product);
    }else {
        res.json({ 'message': 'Product not found' });
    }
})

export {
    getProducts,
    getProductById
}