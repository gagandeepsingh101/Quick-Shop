import express from 'express';
import { fetchUser, loginUser, registerUser } from '../controller/auth.js';
import auth from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/',auth, fetchUser);

export default authRouter;
