import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { deleteProduct, createProduct, updateProduct, createProductReview, getProducts, getProductById, getTopProducts } from '../controllers/productController.js';

const router = express.Router()

// @desc   Fetch all products
// @route  GET /api/products
// @access Public route
router.get('/', getProducts);

router.post('/:id/reviews', protect, createProductReview);

router.post('/', protect, admin, createProduct);

router.get('/top', getTopProducts);

// @desc   Fetches single product
// @route  GET /api/products/:id
// @access Public route
router.get('/:id', getProductById);

router.put('/:id', protect, admin, updateProduct);

router.delete('/:id',protect, admin, deleteProduct);

export default router;