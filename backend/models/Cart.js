import mongoose from "../mongoose.js";

const CartSchema = new mongoose.Schema({
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Match user._id from user.js
    ref: "User",
    required: true,
    unique: true // One cart per user
  }
});

// Create and export the Cart model
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;