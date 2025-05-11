import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log("Adding product to cart:", product);
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const existingProduct = prevItems.find((item) => item.productID === product.productID);
      
      if (existingProduct) {
        // If the product exists, update its quantity
        return prevItems.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // If the product doesn't exist, add it to the cart with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productID, quantity) => {
    setCartItems(prev =>
      prev.map(item => item.productID === productID ? { ...item, quantity } : item)
    );
  };

  const removeItem = (productID) => {
    setCartItems(prev => prev.filter(item => item.productID !== productID));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
