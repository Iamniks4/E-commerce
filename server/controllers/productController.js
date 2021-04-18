import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// @desc   Fetch all products
// @route  GET /api/products
// @access Public route
const getProducts = asyncHandler(async(req, res) => {

    const pageSize = 4;

    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
    ? {
        "name": {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))

    res.json({products, page, pages: Math.ceil(count/pageSize)});
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

// @desc   Deletes a product
// @route  DELETE /api/products/:id
// @access Private route
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove();
        res.json({ message: 'product removed' });
    }else {
        res.status(404);
        res.json({ 'message': 'Product not found' });
    }
})


// @desc Creates a sample product
// @route POST /api/products
// @access Private Admin Route
const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

// @desc Update a sample product
// @route POST /api/products/:id
// @access Private Admin Route
const updateProduct = asyncHandler(async(req, res) => {
    const { name, price, description, brand, image, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;


        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not fount');
    }
})

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async(req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    

    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed) {
            res.status(400);
            throw new Error('Product Already Reviewed')
        } else {
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review)

            product.numReviews = product.reviews.length

            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            await product.save()

            res.status(201).json({ message: 'Review Added' });
        }

    } else {
        res.status(404);
        throw new Error('Product not fount');
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  
    res.json(products)
  })

export {
    updateProduct,
    getProducts,
    deleteProduct,
    createProduct,
    getProductById,
    createProductReview,
    getTopProducts
}