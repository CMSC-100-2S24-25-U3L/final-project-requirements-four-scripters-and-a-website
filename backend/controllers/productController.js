import Product from "../models/Product.js";

export const saveProduct = async (req, res) => {
  try {
    // Remove productID from the request body to avoid conflicts with the virtual field
    const { productID, ...productData } = req.body;

    // Create new product from the modified request body (without productID)
    const product = new Product(productData);

    // Save product to database
    await product.save();

    // Return the created product with virtual field productID
    res.status(201).json(product);
  } catch (error) {
    // Return error if save fails
    res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productID } = req.params;
    const { 
      productName,
      productDescription,
      productPrice,
      productType,
      productQuantity,
      productImage
    } = req.body;

    // validate required fields
    if (!productName || !productDescription) {
      return res.status(400).json({ error: 'Product name and description are required' });
    }

    if (productPrice <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0' });
    }

    if (productQuantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }

    // update all product fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      {
        $set: {
          productName,
          productDescription,
          productPrice,
          productType,
          productQuantity,
          productImage
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Server error during product update' });
  }
};


export const removeProduct = async (req, res) => {
  try {
    const { productID } = req.params;

    // delete product from database
    const deletedProduct = await Product.findByIdAndDelete(productID);
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


export const getAllProducts = async (req, res) => { // For displaying list of all products in user landing page 
  try {
    // Fetch all products from the database
    const products = await Product.find();
    console.log('Fetched products:', products);

    // Check if there are any products
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Send the list of products in the response
    res.status(200).json(products);
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error fetching products:', error); // log the error for debugging
    res.status(500).json({ error: 'Failed to fetch products', message: error.message });
  }
};
