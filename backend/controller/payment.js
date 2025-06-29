import Stripe from 'stripe';
import Product from '../models/Product.js';
import sendConfirmationEmail from '../utils/sendConfirmationEmail.js';
const paymentCartItems = async (req, res) => {
    const cart = await Product.find();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity , 0)*100;

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.ceil(total),
            currency: 'usd',
            payment_method_types: ['card'],
        });

        await sendConfirmationEmail(req.body.email, {
            items: cart,
            total:paymentIntent.amount/100,
        });

        res.json({ clientSecret: paymentIntent.client_secret, items: cart, total: paymentIntent.amount/100 , paymentId: paymentIntent.client_secret });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

export { paymentCartItems };
