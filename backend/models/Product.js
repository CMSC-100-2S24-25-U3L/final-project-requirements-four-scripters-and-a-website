import mongoose from "../mongoose.js";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true, maxlength: 500 },
  productPrice: { type: Number, required: true, min: 0 },
  productType: { 
    type: Number, 
    required: true,
    enum: [1, 2, 3, 4, 5]
  },
  productQuantity : { type: Number, required: true, min: 0 },
  productImage: { type: String, required: true } 
});

// Virtual to map _id to productID
productSchema.virtual("productID").get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included in JSON output
productSchema.set("toJSON", {
  virtuals: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;