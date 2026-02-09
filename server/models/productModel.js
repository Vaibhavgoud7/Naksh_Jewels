import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, // Changed to String for easy display
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true }, // Keeps your multiple images
    category: { type: String, required: true },
    sizes: { type: Array, default: [] }, // Added for Ring/Chain sizes
    bestseller: { type: Boolean, default: false }, // Critical for Home Page
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;