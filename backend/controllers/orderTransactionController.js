
import OrderTransaction from "../models/OrderTransaction.js";

export const saveOrderTransaction = async (req, res) => {
  try {
    // first validate if product exists by product id
    const product = await Product.findOne({ productID: req.body.productID });
    if (!product) { // if there is no product
      return res.status(404).json({ error: 'Product not found' });
    }
    // if there order requests more than the available products
    if (product.productQuantity < req.body.orderQuantity) {
      return res.status(400).json({ error: 'Insufficient product quantity' });
    }

    // create order from request body
    const order = new OrderTransaction(req.body);
    await order.save();

    // update product quantity
    product.productQuantity -= req.body.orderQuantity;
    await product.save();

    res.status(201).json(order);  // respond with the created(201) order
  } catch (error) { // else respond with an error(400) message
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