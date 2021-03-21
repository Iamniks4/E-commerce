import express from 'express';

const router = express.Router()

import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

router.post('/', registerUser);

export default router;