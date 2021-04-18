import express from 'express';

const router = express.Router()

import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUserProfile, updateUser } from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', protect, admin, getUsers);

router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

router.post('/', registerUser);

router.put('/:id', protect, admin, updateUser);

router.delete('/:id', protect, admin, deleteUser);

router.get('/:id', protect, admin, getUserById);

export default router;