import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;