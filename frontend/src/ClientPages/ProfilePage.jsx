import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from "../components/Header";
import ProfileSidebar from "../components/ProfileSidebar";
import Tabs from "../components/Tabs";
import OrdersList from "../components/OrderList";
import OrderService from '../services/OrderService';
import ConfirmationModal from "../components/ConfirmationModal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('ALL ORDERS');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: userProfile, loading: userLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const tabs = ['ALL ORDERS', 'PENDING', 'COMPLETED', 'CANCELLED'];
  const statusMap = { 0: 'PENDING', 1: 'COMPLETED', 2: 'CANCELLED' };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const orderDetails = await OrderService.getOrdersByUser();

        const processed = orderDetails.map(order => {
          const items = order.products.map(p => {
            const product = p.productID || {};
            return {
              name: product.productName || 'Product Name',
              price: product.productPrice || 50,
              quantity: p.quantity || 1,
              image: product.productImage || null
            };
          });
          const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return {
            id: order._id || order.transactionID,
            status: statusMap[order.orderStatus] || 'UNKNOWN',
            dateOrdered: new Date(order.dateOrdered).toLocaleDateString(),
            items,
            total: `₱${total.toFixed(2)}`
          };
        });

        setOrders(processed);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userProfile) fetchOrders();
  }, [userProfile]);

  const filteredOrders = activeTab === 'ALL ORDERS'
    ? orders
    : orders.filter(order => order.status === activeTab);


  const confirmCancelOrder = async () => {
    if (!selectedOrderId) return;
    try {
      await OrderService.cancelOrder(selectedOrderId);
      setOrders(prev =>
        prev.map(order =>
          order.id === selectedOrderId
            ? { ...order, status: 'CANCELLED' }
            : order
        )
      );
      toast.success('Order cancelled successfully!')
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error('Failed to cancel order. Please try again later.');
    } finally {
      setShowModal(false);
      setSelectedOrderId(null);
    }
  };

  const requestCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };


  const cancelModal = () => {
    setShowModal(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="harvest-container">
      <Header />
      <div className="main-content">
        <ProfileSidebar user={userProfile} loading={userLoading} />
        <div className="orders-container">
          <h1 className="page-title">My Orders</h1>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <OrdersList
            orders={filteredOrders}
            loading={loading}
            error={error}
            activeTab={activeTab}
            onCancel={requestCancelOrder}
          />
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          title="Cancel Order"
          message="Are you sure you want to cancel this order?"
          confirmText="Yes, Cancel Order"
          cancelText="Go Back"
          onConfirm={confirmCancelOrder}
          onCancel={cancelModal}
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