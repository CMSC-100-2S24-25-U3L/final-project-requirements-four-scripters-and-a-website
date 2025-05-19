import OrderCard from './OrderCard';

export default function OrdersList({ orders, loading, error, activeTab, onCancel }) {
  if (loading) return <div className="loading-message">Loading your orders...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (orders.length === 0)
    return <div className="empty-message">No {activeTab !== 'ALL ORDERS' ? activeTab.toLowerCase() : ''} orders found.</div>;

  return (
    <div className="orders-list">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} onCancel={onCancel} />
      ))}
    </div>
  );
}