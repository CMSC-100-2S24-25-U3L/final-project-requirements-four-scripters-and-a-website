import { useState, useEffect } from 'react';
import Header from "../components/Header";
import { useCart } from '../context/CartContext';
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + ((item.productPrice ?? 0) * item.quantity),
    0
  );
  const shippingFee = 20.00;
  const total = subtotal + shippingFee;

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

          <OrderSummary subtotal={subtotal} shippingFee={shippingFee} total={total} />
        </div>
      </div>
    </div>
  );
}
