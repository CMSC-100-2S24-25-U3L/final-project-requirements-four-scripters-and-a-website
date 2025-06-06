import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext'; 
import CartService from '../services/CartService'; 

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); 
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const hasInitialized = useRef(false);

  // Load saved cart when user logs in
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      hasInitialized.current = false;
      return;
    }

    if (isLoadingCart || hasInitialized.current) return;

    async function fetchCart() {
      setIsLoadingCart(true);
      
      try {
        console.log("Fetching cart for user:", user.email);
        const savedCart = await CartService.getCart();
        console.log("Received cart data:", savedCart);
        
        // Handle different response formats
        let cartProducts = [];
        if (Array.isArray(savedCart)) {
          cartProducts = savedCart;
        } else if (savedCart && Array.isArray(savedCart.products)) {
          cartProducts = savedCart.products;
        }
        
        if (cartProducts.length > 0) {
          const validCartItems = cartProducts
            .filter(item => {
              const hasValidData = item && 
                item.productID && 
                item.quantity && 
                item.quantity > 0;
              return hasValidData;
            })
            .map(item => {
              // Handle populated vs non-populated product data
              if (typeof item.productID === 'object' && item.productID.productName) {
                // Backend populated the product details
                return {
                  productID: item.productID._id,
                  productName: item.productID.productName,
                  productPrice: item.productID.productPrice,
                  productImage: item.productID.productImage,
                  quantity: item.quantity
                };
              } else {
                // Only have product ID - this shouldn't happen with proper backend
                console.warn("Product details not populated for:", item.productID);
                return {
                  productID: item.productID,
                  quantity: item.quantity
                };
              }
            });
          
          console.log("Setting cart items:", validCartItems);
          setCartItems(validCartItems);
        } else {
          console.log("No saved cart found, starting empty");
          setCartItems([]);
        }
        
      } catch (error) {
        console.error("Failed to fetch saved cart:", error);
        setCartItems([]);
      } finally {
        setIsLoadingCart(false);
        hasInitialized.current = true;
      }
    }

    fetchCart();
  }, [user?.email]); // Only depend on user email

  // Save cart when items change
  useEffect(() => {
    if (!user || isLoadingCart || !hasInitialized.current) {
      return;
    }

    const saveCart = async () => {
      try {
        console.log("Saving cart:", cartItems.length, "items");
        await CartService.saveCart(
          cartItems.map(item => ({
            productID: item.productID,
            quantity: item.quantity,
          }))
        );
        console.log("Cart saved successfully");
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    };

    // Debounce saves
    const timeoutId = setTimeout(saveCart, 500);
    return () => clearTimeout(timeoutId);

  }, [cartItems, user?.email]);

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.productID === product.productID);

      if (existingProduct) {
        return prevItems.map(item =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productID, quantity) => {
    if (quantity <= 0) {
      removeItem(productID);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item => item.productID === productID ? { ...item, quantity } : item)
    );
  };

  const removeItem = (productID) => {
    setCartItems(prev => prev.filter(item => item.productID !== productID));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      removeItem, 
      clearCart, 
      setCartItems,
      isLoadingCart
    }}>
      {children}
    </CartContext.Provider>
  );
}