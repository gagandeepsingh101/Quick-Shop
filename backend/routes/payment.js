import express from 'express';
import { paymentCartItems } from '../controller/payment.js';
import auth from '../middleware/auth.js';
const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', auth, paymentCartItems);

export default paymentRouter;