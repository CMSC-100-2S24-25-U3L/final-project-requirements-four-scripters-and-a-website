
import OrderTransaction from "../models/OrderTransaction.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const saveOrderTransaction = async (req, res) => {
  try {
    const { products, email } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "At least one product is required" });
    }

    // Validate and update each product
    for (const item of products) {
      if (!mongoose.Types.ObjectId.isValid(item.productID)) {
        return res.status(400).json({ error: `Invalid productID: ${item.productID}` });
      }

      const product = await Product.findById(item.productID);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productID}` });
      }

      if (product.productQuantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for: ${product.productName}` });
      }

      // Deduct stock
      product.productQuantity -= item.quantity;
      await product.save();
    }

    // Save the order
    const order = new OrderTransaction({
      products,
      email,
      orderStatus: 0, // default to pending
      dateOrdered: new Date()
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateOrderTransaction = async (req, res) => {
  try {
    const { transactionID } = req.params;
    const { orderStatus } = req.body;
    // validate order status
    if (![0, 1, 2].includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid orderStatus value' });
    }
    // update order in database
    const updatedOrder = await OrderTransaction.findOneAndUpdate(
      { transactionID },
      { $set: { orderStatus } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order transaction not found' });
    }
    // return updated order
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error during order update' });
  }
};

export const removeOrderTransaction = async (req, res) => {
  try {
    const { transactionID } = req.params;

    // delete order from database
    const deletedOrder = await OrderTransaction.findOneAndDelete({ transactionID });
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order transaction not found' });
    }

    // return success message
    res.json({
      message: 'Order transaction deleted successfully',
      transactionID: deletedOrder.transactionID
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during order deletion' });
  }
};

export const getOrderTransaction = async (req, res) => {
  try { // check if there is a transaction by transactionID
    const transaction = await OrderTransaction.findOne({ transactionID: req.params.transactionID });
    // respond with the error(404) message if we fail to find a match
    if (!transaction) return res.status(404).json({ error: 'Transaction not found '});
    res.json(transaction); // else respond with the transaction    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getOrdersByUser = async (req, res) => {
//   try {
//     const { email } = req.query;
//     if (!email) return res.status(400).json({ error: 'Email query parameter is required' });

//     const orders = await OrderTransaction.find({ userEmail: email }).populate('product');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getOrdersByUser = async (req, res) => {
  try {
    const email = req.user.email; // Comes from token payload (e.g., jwt.decode(token))
    if (!email) return res.status(400).json({ error: 'User email missing in token' });

    const orders = await OrderTransaction.find({ email })
      .populate('products.productID');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrdersWithProducts = async (req, res) => {
  try {
    const { transactionIDs } = req.body;
    if (!transactionIDs || !Array.isArray(transactionIDs)) {
      return res.status(400).json({ error: 'transactionIDs array is required in the request body' });
    }

    // Assuming you can fetch order details including product info.
    // This might require a join or populate if using MongoDB with refs.

    // For example, if orders have a reference to products:
    const orders = await OrderTransaction.find({ transactionID: { $in: transactionIDs } })
      .populate('product'); // Adjust if you store product refs differently

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
