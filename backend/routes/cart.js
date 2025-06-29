import { Router } from "express";
import { addToCart, clearCart, getCartItems, removeFromCart, updateCart } from "../controller/cart.js";
import auth from "../middleware/auth.js";
const cartRouter = Router();

cartRouter.get('/', auth, getCartItems);
cartRouter.post('/add', auth, addToCart);
cartRouter.put('/update', auth, updateCart);
cartRouter.delete('/remove/all', auth, clearCart);
cartRouter.delete('/remove/:productId', auth, removeFromCart);


export default cartRouter;