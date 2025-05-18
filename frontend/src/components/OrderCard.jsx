import OrderItem from './OrderItem';

export default function OrderCard({ order, onCancel }) {
  return (
    <div className="order-card">
      <div className="order-header">
        <h3 className="order-id">ORDER #{order.id}</h3>
        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
      </div>
      <div className="order-content">
        {order.items.map((item, idx) => (
          <OrderItem key={idx} item={item} />
        ))}
        <div className="order-footer">
          {order.status === 'PENDING' && (
            <button className="cancel-button" onClick={() => onCancel(order.id)}>Cancel Order</button>
          )}
          <div className="order-total">TOTAL {order.total}</div>
        </div>
      </div>
    </div>
  );
}