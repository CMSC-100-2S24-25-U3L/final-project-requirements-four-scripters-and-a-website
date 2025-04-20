import User from "../models/User.js";
import Product from "../models/Product.js";
import OrderTransaction from "../models/OrderTransaction.js";

// shared validation function
// validate email format
  // ^[^\s@]+      -> start with one or more characters that are not whitespace (\s) or @
  // @            -> followed by a single @,
  // [^\s@]+      -> then again one or more characters that are not whitespace or @
  // \.           -> followed by a literal . (dot)
  // [^\s@]+$     -> And end with one or more characters that are not whitespace or @
const validateEmailFormat = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// helper function to handle validation and normalization
// returns normalized email if valid, otherwise sends error response
const processEmail = (email, res) => {
  if (!validateEmailFormat(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return null;
  }
  return email.toLowerCase();
};

export const saveUser = async (req, res) => {
  try {
    const { email } = req.body;
    const processedEmail = processEmail(email, res);
    if (!processedEmail) return; // failed validation

    const user = new User({ ...req.body, email: processedEmail });
    await user.save();
    
    // exclude password from response
    const { password, ...safeUser } = user.toObject();
    res.status(201).json(safeUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const saveProduct = async (req, res) => {
  try {
    // create new product from requst body
    const product = new Product(req.body);
    // save product to database
    await product.save();
    // return created product
    res.status(201).json(product);
  } catch (error) {
    // return error if save fails
    res.status(400).json({ error: error.message });
  }
};

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

export const updateUser = async (req, res) => {
  try {
    // validate and process email from URL params
    const email = processEmail(req.params.email, res);
    if (!email) return;

    // prepare updates (this should be in the forms)
    const { firstName, middleName, lastName } = req.body;
    const updates = { firstName, lastName };
    
    // check if there is a middleName
    if (middleName !== undefined) {
      updates.middleName = middleName;  // add middleName to updates
    }

    // update user
    const updatedUser = await User.findOneAndUpdate(
      { email },  // search by the email
      { $set: updates },  // update fields in updates
      { 
        new: true,  // return the updated document instead of the orginal one
        runValidators: true // ensure to validate using the schema in the models
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // return safe user data (exclude the password)
    const { password, ...safeUser } = updatedUser.toObject();
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error during update' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const { productQuantity } = req.body;

    // check if the quantity is defined or if there remains at least 1 product
    if (productQuantity === undefined || productQuantity < 0) {
      return res.status(400).json({ error: 'Invalid or missing productQuantity' });
    }

    // update product in database
    const updatedProduct = await Product.findOneAndUpdate(
      { productID },
      { $set: { productQuantity } },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // return updated product
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server error during product update' });
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

export const removeUser = async (req, res) => {
  try {
    // validate and process email from URL params
    const email = processEmail(req.params.email, res);
    if (!email) return;

    // delete user from database
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // return success message
    res.json({ 
      message: 'User deleted successfully',
      email: deletedUser.email 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during deletion' });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { productID } = req.params;

    // delete product from database
    const deletedProduct = await Product.findOneAndDelete({ productID });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // return sucecess message
    res.json({
      message: 'Product deleted successfully',
      productID: deletedProduct.productID
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during product deletion' });
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

export const getUser = async (req, res) => {
  try { // check if there is a user by email
    const user = await User.findOne({ email: req.params.email })
    // respond with the error(404) message if we fail to find a match
    if (!user) return res.status(404).json({ error: 'User not found '});
    res.json(user); // else respond with the user    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const getProduct = async (req, res) => {
  try { // check if there is a product by the productID
    const product = await Product.findOne({ productID: req.params.productID });
    // respond with the error(404) message if we fail to find one
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product); // else respond with the product
  } catch (error) {
    res.status(500).json({ error: error.message });
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



