import Cart from "../models/Cart.js"; 

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productID');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
};

// Save or update cart
export const saveOrUpdateCart = async (req, res) => {
  try {
    const { products } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      // Update existing cart
      cart.products = products;
    } else {
      // Create new cart
      cart = new Cart({ userId: req.user._id, products });
    }

    await cart.save();
    res.status(200).json({ message: 'Cart saved', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error saving cart', error });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user._id }, { products: [] });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error });
  }
};