import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { devAuthHandlers } from '../middleware/devMiddleware.js';

const router = express.Router();

// Use development handlers when in development mode
const register = process.env.NODE_ENV === 'development' ? devAuthHandlers.register : registerUser;
const login = process.env.NODE_ENV === 'development' ? devAuthHandlers.login : loginUser;

router.post('/', register);
router.post('/login', login);
router.get('/profile', protect, getUserProfile);

export default router;