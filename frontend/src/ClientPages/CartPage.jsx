import { useState } from 'react';
import Header from "../components/Header";
import { useCart } from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import OrderService from '../services/OrderService';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HarvestLoadingScreen from '../components/HarvestLoadingScreen';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart, isLoadingCart } = useCart();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + ((item.productPrice ?? 0) * item.quantity),
    0
  );
  const shippingFee = 20.00;
  const total = subtotal + shippingFee;

  const handleProceedCheckout = () => {
    if (!user) {
      toast.error("You must be logged in to checkout.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setShowModal(true);
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

    console.log("Submitting order:", orderPayload);

    try {
      const response = await OrderService.createOrder(orderPayload);
      console.log("Order created:", response.data);
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      if (error.response?.data?.message) {
        toast.error(`Checkout failed: ${error.response.data.message}`);
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading screen while cart is being restored
  if (isLoadingCart) {
    return <HarvestLoadingScreen />;
  }

  return (
    <div className="harvest-container">
      <Header />

      <div className="cart-page">
        <h1 className="cart-title">Your Cart ({cartItems.length})</h1>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              Your cart is empty. Start shopping to add items!
            </div>
          ) : (
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
          )}

          <OrderSummary
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
            onCheckout={handleProceedCheckout}
            submitting={submitting}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          title="Confirm Checkout"
          message={`Are you sure you want to place this order for $${total.toFixed(2)}?`}
          confirmText="Place Order"
          cancelText="Cancel"
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmCheckout}
        />
      )}

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
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