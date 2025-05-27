import { useState, useEffect } from 'react';
import Header from "../components/Header";
import { useCart } from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import OrderService from '../services/OrderService';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartService from '../services/CartService';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart, setCartItems } = useCart();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const subtotal = cartItems.reduce(
    (sum, item) => sum + ((item.productPrice ?? 0) * item.quantity),
    0
  );
  const shippingFee = 20.00;
  const total = subtotal + shippingFee;


  useEffect(() => {
    const restoreCart = async () => {
      if (!user) return;
      try {
        const saved = await CartService.getCart();
        if (saved?.products?.length > 0) {
          // Convert saved cart to your context's expected format
          const restored = saved.products.map(item => ({
            productID: item.productID._id || item.productID,
            productName: item.productID.productName,
            productPrice: item.productID.productPrice,
            productImage: item.productID.productImage,
            quantity: item.quantity
          }));
          setCartItems(restored);
        }
      } catch (err) {
        console.error("Failed to restore cart:", err);
      }
    };

    restoreCart();
  }, [user]);

  useEffect(() => {
    const saveCart = async () => {
      if (!user) return;

      console.log("Saving cart to backend:", cartItems); // <-- Debug log

      try {
        await CartService.saveCart(cartItems.map(item => ({
          productID: item.productID,
          quantity: item.quantity
        })));
      } catch (err) {
        console.error("Failed to save cart:", err);
      }
    };

    saveCart();
  }, [cartItems, user]);

  const handleProceedCheckout = () => {
    if (!user) {
      alert("You must be logged in to checkout.");
      return;
    }
    setShowModal(true); // show modal
  };

  const handleConfirmCheckout = async () => {
    setShowModal(false);
    setSubmitting(true);

    const orderPayload = {
      email: user.email,
      products: cartItems.map(item => ({
        productID: item.productID,
        quantity: item.quantity,
      })),
      orderStatus: 0,
      dateOrdered: new Date().toISOString(),
    };

    console.log("Submitting orderPayload:", orderPayload);

    try {
      const response = await OrderService.createOrder(orderPayload);
      console.log("Order created:", response.data);
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      if (error.response) {
        console.error("Backend said:", error.response.data);
      }
      toast.error("Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="harvest-container">
      <Header />

      <div className="cart-page">
        <h1 className="cart-title">Your Cart ({cartItems.length})</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                key={item.productID}
                item={item}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
            onCheckout={handleProceedCheckout} // changed from handleCheckout
            submitting={submitting}
          />
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          title="Confirm Checkout"
          message="Are you sure you want to place this order?"
          confirmText="Confirm"
          cancelText="Cancel"
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmCheckout}
        />
      )}
    <ToastContainer 
      position="top-right" 
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </div>
  );
}
