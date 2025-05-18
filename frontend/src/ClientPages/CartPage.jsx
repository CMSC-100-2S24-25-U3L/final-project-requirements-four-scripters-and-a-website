import { useState } from 'react';
import Header from "../components/Header";
import { useCart } from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import OrderService from '../services/OrderService'; // <-- Import the order service
import { useAuth } from '../context/AuthContext';     // <-- To get user email or ID

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + ((item.productPrice ?? 0) * item.quantity),
    0
  );
  const shippingFee = 20.00;
  const total = subtotal + shippingFee;

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to checkout.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to checkout?");
    if (!confirmed) return;

    setSubmitting(true);

    try {
      // Build order payload
      const orderPayload = {
        email: user.email, // ✅ match schema
        products: cartItems.map(item => ({
          productID: item.productID,
          quantity: item.quantity,
        })),
        orderStatus: 0, // PENDING
        dateOrdered: new Date().toISOString(),
      };

      // Submit to backend
      await OrderService.createOrder(orderPayload);

      alert("Order placed successfully!");
      clearCart(); // Optional: clears the cart
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
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

          <OrderSummary subtotal={subtotal} shippingFee={shippingFee} total={total} onCheckout={handleCheckout} submitting={submitting} />
        </div>
      </div>
    </div>
  );
}
