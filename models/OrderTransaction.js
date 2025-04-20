import mongoose from "../mongoose.js";

const orderTransactionSchema = new mongoose.Schema({
  transactionID: { type: String, required: true, unique: true },
  productID: { type: String, required: true}, // Product foreign key
  orderQuantity : { type: Number, required: true, min: 1 }, // Upon confirmation of purchase, it will decrease the product quantity.
  productDescription: { type: String, required: true, maxlength: 500 },
  orderStatus: { 
    type: Number, 
    required: true,
    enum: [0, 1, 2],
    default: 0
  },
  email : { type: String, required: true}, // User foreign key
  dateOrdered: { type: Date, required: true, default: Date.now },
  // time: { } not sure how to do this, walang "Time" type sa docs
});

const OrderTransaction = mongoose.model("Order_Transaction", orderTransactionSchema);
export default OrderTransaction;