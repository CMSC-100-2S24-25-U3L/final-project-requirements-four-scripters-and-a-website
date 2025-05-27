import React, { useState, useEffect } from 'react';
import OrderService from '../services/OrderService'; 
import AdminHeader from "../AdminComponents/AdminHeader";
import Footer from "../components/Footer";
import '../css/ManageOrder.css';
import ConfirmationModal from "../components/ConfirmationModal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HarvestLoadingScreen from '../components/HarvestLoadingScreen';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('ALL ORDERS');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmationOrder, setConfirmationOrder] = useState(null);
  const [newStatus, setNewStatus] = useState(null);       

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const allOrdersResponse = await OrderService.getAllOrders();

        const ordersArray = allOrdersResponse.orders || allOrdersResponse || [];

        const processed = ordersArray.map(order => {
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
            _id: order._id || order.transactionID,
            orderStatus: order.orderStatus,
            dateOrdered: new Date(order.dateOrdered),
            products: order.products,   // full products for modal
            totalPrice: total,
            user: order.user || null,
            email: order.email || (order.user ? order.user.email : ''),
            transactionId: order.transactionId || order._id
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

    fetchOrders();
  }, []);

    const handleOpenModal = (order, status) => {
    setConfirmationOrder(order);   // separate from selectedOrder used by details modal
    setNewStatus(status);
    setShowModal(true);
    };

    const handleConfirmUpdate = async () => {
    try {
        await OrderService.updateOrder(confirmationOrder.transactionId, newStatus);

        setOrders(prevOrders =>
        prevOrders.map(order =>
            order._id === confirmationOrder._id
            ? { ...order, orderStatus: newStatus }
            : order
        )
        );

        toast.success("Order status updated successfully!");
        setShowModal(false);
        setConfirmationOrder(null);
        setNewStatus(null);
    } catch (error) {
        console.error('Failed to update order status:', error);
        toast.error("Failed to update order status. Please try again.");
    }
    };

    const handleCancel = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setNewStatus(null);
    };


    const getStatusText = (status) => {
    switch(status) {
        case 0: return 'PENDING';
        case 1: return 'COMPLETED';
        case 2: return 'CANCELLED';
        default: return 'UNKNOWN';
    }
    };

  const getStatusCount = (status) => {
    if (status === 'ALL ORDERS') return orders.length;
    return orders.filter(order => getStatusText(order.orderStatus) === status).length;
  };

  const getTotalQuantity = (products) => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  const getCustomerName = (order) => {
    if (order.user && order.user.firstName && order.user.lastName) {
      return `${order.user.firstName} ${order.user.lastName}`;
    } else if (order.email) {
      const name = order.email.split('@')[0];
      return name.split('.').map(part =>
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
    } else {
      return 'Unknown Customer';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'ALL ORDERS' || getStatusText(order.orderStatus) === activeFilter;
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      (order.email && order.email.toLowerCase().includes(lowerSearch)) ||
      (order.transactionId && order.transactionId.toLowerCase().includes(lowerSearch)) ||
      getCustomerName(order).toLowerCase().includes(lowerSearch);
    return matchesFilter && matchesSearch;
  });

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const openOrderDetails = (order) => {
    console.log("Open order details:", order);
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

   if (loading) return <HarvestLoadingScreen />;
          if (error) return <div className="error-message">Error: {error}</div>;
  


  return (
    <div className="admin-dashboard">
      <div className="admin-nav">
        <AdminHeader />
      </div>

      <div className="space"></div>

      <div className="dashboard-content manage-orders-content">
        <h1 className="Header">Manage Orders</h1>
        <hr className="divider" />

        {/* Filter Tabs */}
        <div className="admin-filter-tabs">
          {['ALL ORDERS', 'PENDING', 'COMPLETED', 'CANCELLED'].map(label => (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`admin-filter-tab ${activeFilter === label ? 'active' : ''}`}
            >
              <span>{label}</span>
              <span className="admin-tab-count">{getStatusCount(label)}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="admin-search-container">
          <input
            type="text"
            placeholder="Search by customer name, email, or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        {/* Loading & Error */}
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Orders Grid */}
        <div className="admin-orders-grid">
          {filteredOrders.length === 0 && !loading && <p>No orders found.</p>}

          {filteredOrders.map(order => (
            <div
              key={order._id}
              className="admin-order-card"
              onClick={() => openOrderDetails(order)}
            >
              <div className="admin-order-header">
                <div className="admin-customer-info">
                  <h3>{getCustomerName(order)}</h3>
                  <p>{order.email}</p>
                </div>
                <div className="admin-transaction-info">
                  <p className="label">TRANSACTION ID</p>
                  <p className="value">{order.transactionId}</p>
                </div>
              </div>

              <div className="admin-order-details">
                <div className="admin-detail-item">
                  <p className="label">ORDER QUANTITY</p>
                  <p className="value">{getTotalQuantity(order.products)} items</p>
                </div>

                <div className="admin-detail-item">
                  <p className="label">TOTAL PRICE</p>
                  <p className="value">₱{order.totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="admin-order-status">
                <p className="label">ORDER STATUS</p>
                <p className={`value admin-status-${getStatusText(order.orderStatus).toLowerCase().replace(' ', '-')}`}>
                  {getStatusText(order.orderStatus)}
                </p>
              </div>

              <div className="admin-order-date">
                <p className="label">DATE ORDERED</p>
                <p className="value">{formatDate(order.dateOrdered)}</p>
              </div>

              <div className="admin-products-preview">
                <p className="label">PRODUCTS ({order.products.length})</p>
                <div className="admin-products-list">
                  {order.products.slice(0, 2).map((product, i) => (
                    <span key={i} className="admin-product-item">
                      {product.productID?.productName || 'Product'} (x{product.quantity})
                    </span>
                  ))}
                  {order.products.length > 2 && (
                    <span className="admin-more-products">
                      +{order.products.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Buttons for actions */}
                <div className="admin-action-buttons">
                    <button
                        onClick={() => openOrderDetails(order)}
                        className="admin-btn admin-btn-view"
                    >
                        VIEW DETAILS
                    </button>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(order, 2); // cancel
                    }}
                    disabled={order.orderStatus === 1 || order.orderStatus === 2}
                    className="admin-btn admin-btn-decline"
                    >
                    DECLINE
                    </button>

                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(order, 1); // accept
                    }}
                    disabled={order.orderStatus === 1 || order.orderStatus === 2}
                    className="admin-btn admin-btn-accept"
                    >
                    ACCEPT
                    </button>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />

            {/* Order Details Modal */}
            {selectedOrder && (
            <div className="admin-modal-overlay" onClick={closeOrderDetails}>
                <div
                className="admin-modal-content"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="admin-modal-header">
                    <h2>Order Details</h2>
                    <button
                    className="admin-close-btn" 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        closeOrderDetails();
                    }}
                    aria-label="Close modal"
                    >
                    ×
                    </button>
                </div>

                <div className="admin-modal-body">
                    {/* Debug log to check data */}
                    {console.log("Selected Order:", selectedOrder)}

                    <div className="admin-order-info">
                    <h3>Customer Information</h3>
                    <p>
                        <strong>Name:</strong> {getCustomerName(selectedOrder)}
                    </p>
                    <p>
                        <strong>Email:</strong> {selectedOrder.email}
                    </p>
                    <p>
                        <strong>Transaction ID:</strong> {selectedOrder.transactionId}
                    </p>
                    <p>
                        <strong>Order Date:</strong> {formatDate(selectedOrder.dateOrdered)} 5:30 PM
                    </p>
                    <p>
                        <strong>Status:</strong>{" "}
                        <span className={`status-${getStatusText(selectedOrder.orderStatus).toLowerCase()}`}>
                        {getStatusText(selectedOrder.orderStatus)}
                        </span>
                    </p>
                    </div>

                    <div className="admin-products-details">
                    <h3>Products Ordered</h3>
                    <div className="admin-products-table">
                        <div className="admin-table-header">
                        <span>Product</span>
                        <span>Quantity</span>
                        <span>Unit Price</span>
                        <span>Subtotal</span>
                        </div>
                        {selectedOrder.products.map((product, index) => (
                            <div key={index} className="admin-table-row">
                                <span>{product.productID.productName}</span>    
                                <span>{product.quantity}</span>
                                <span>₱{product.productID.productPrice}</span>
                                <span>₱{(product.quantity * product.productID.productPrice).toLocaleString()}</span>
                            </div>

                        ))}
                        <div className="admin-table-footer">
                        <span>
                            <strong>Total: ₱{selectedOrder.totalPrice.toLocaleString()}</strong>
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}


            {showModal && (
            <ConfirmationModal
                isOpen={showModal}
                title="Confirm Status Update"
                message={`Are you sure you want to change the status of this order to ${getStatusText(newStatus)}?`}
                onConfirm={handleConfirmUpdate}
                onCancel={handleCancel}
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
