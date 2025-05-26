import { Link } from 'react-router-dom'; 

export default function OrderSummary({ subtotal, shippingFee, total, onCheckout, submitting}) {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="summary-item">
        <span>Mode of transaction:</span>
        <span>Cash-on-delivery</span>
      </div>

      <div className="summary-item">
        <span>Subtotal:</span>
        <span>₱{subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-item">
        <span>Shipping fee:</span>
        <span>₱{shippingFee.toFixed(2)}</span>
      </div>

      <div className="summary-item total">
        <span>Total:</span>
        <span>₱{total.toFixed(2)}</span>
      </div>

      <button className="checkout-btn" onClick={onCheckout} disabled={submitting}>PROCEED TO CHECKOUT</button>
      {/* <button className="continue-shopping-btn">Continue Shopping</button> */}
      <Link to="/home-page" className="continue-shopping-btn">
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
}