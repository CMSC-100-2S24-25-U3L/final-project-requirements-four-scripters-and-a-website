import mongoose from "../mongoose.js";

const orderTransactionSchema = new mongoose.Schema({
  products: [
    {
      productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],

  orderStatus: {
    type: Number,
    required: true,
    enum: [0, 1, 2],
    default: 0
  },

  email: { type: String, required: true },
  dateOrdered: { type: Date, required: true, default: Date.now }
});

const OrderTransaction = mongoose.model("Order_Transaction", orderTransactionSchema);
export default OrderTransaction;