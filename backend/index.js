import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import paymentRouter from './routes/payment.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

app.use(cors({ origin:"*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', authRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));