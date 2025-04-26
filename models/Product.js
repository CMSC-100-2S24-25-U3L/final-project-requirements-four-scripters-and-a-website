import mongoose from "../config/mongoose.js";

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productDescription: { type: String, required: true, maxlength: 500 },
  productType: { 
    type: Number, 
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  productQuantity : { type: Number, required: true, unique: true, min: 0 }
});

const Product = mongoose.model("Product", productSchema);
export default Product;