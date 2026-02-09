import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { logoutUser } from '../controllers/userController.js';
import { userProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser)
userRouter.get('/profile', authMiddleware, userProfile);

export default userRouter;