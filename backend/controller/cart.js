import Product from "../models/Product.js";

const getCartItems = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId });
    res.json({ items: products }); 
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { title, price, imageURL, description, quantity = 1 } = req.body;
    if (!title || !price || !imageURL || !description || quantity < 1) {
      return res.status(400).json({ error: 'Invalid product details' });
    }

    let product = await Product.findOne({ userId: req.userId, title });
    if (product) {
      product.quantity += quantity;
      await product.save();
    } else {
      product = new Product({
        userId: req.userId,
        title,
        price,
        imageURL,
        description,
        quantity,
      });
      await product.save();
    }

    await product.populate('userId', 'email');
    res.json(product);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity < 0) {
      return res.status(400).json({ error: 'Invalid productId or quantity' });
    }

    const product = await Product.findOne({ _id: productId, userId: req.userId });
    if (!product) return res.status(404).json({ error: 'Product not found in cart' });

    if (quantity === 0) {
      await Product.deleteOne({ _id: productId, userId: req.userId });
    } else {
      product.quantity = quantity;
      await product.save();
    }

    const products = await Product.find({ userId: req.userId }).populate('userId', 'email');
    res.json({ items: products });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

const clearCart = async (req, res) => {
  try {
    await Product.deleteMany({ userId: req.userId });
    res.json({ message: 'Cart cleared', items: [] });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId, userId: req.userId });
    if (!product) return res.status(404).json({ error: 'Product not found in cart' });

    await Product.deleteOne({ _id: req.params.productId, userId: req.userId });
    const products = await Product.find({ userId: req.userId }).populate('userId', 'email');
    res.json({ items: products });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};

export {
    addToCart, clearCart, getCartItems, removeFromCart, updateCart
};
