export default function CartItem({ item, updateQuantity, removeItem }) {
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.productImage} alt={item.productName} />
      </div>

      <div className="item-details">
        <h3>{item.productName}</h3>
        <p className="item-price">₱{(item.productPrice ?? 0).toFixed(2)}</p>
      </div>

      <div className="item-controls">
        <p className="total-price">
          Total: ₱{((item.productPrice ?? 0) * item.quantity).toFixed(2)}
        </p>
        <div className="controls-wrapper">
            <div className="quantity-controls">
            <button
                className="quantity-btn"
                onClick={() => updateQuantity(item.productID, item.quantity - 1)}
                disabled={item.quantity <= 1}
            >
                -
            </button>
            <span className="quantity">{item.quantity}</span>
            <button
                className="quantity-btn"
                onClick={() => updateQuantity(item.productID, item.quantity + 1)}
            >
                +
            </button>
            </div>

            <button className="remove-btn" onClick={() => removeItem(item.productID)}>
            Remove
            </button>
        </div>

      </div>
    </div>
  );
}