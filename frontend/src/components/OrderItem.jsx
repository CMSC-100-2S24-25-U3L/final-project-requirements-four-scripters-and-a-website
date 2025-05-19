export default function OrderItem({ item }) {
  return (
    <div className="order-item">
      <div className="item-image">
        {item.image ? <img src={item.image} alt={item.name} /> : null}
      </div>
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        <div className="item-meta">
          <span className="item-price">PRICE ₱{item.price}</span>
          <span className="item-quantity">QTY: {item.quantity}</span>
        </div>
      </div>
    </div>
  );
}