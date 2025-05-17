import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from "../components/Header";
import OrderService from '../services/OrderService';

export default function ProfilePage () {
    const [activeTab, setActiveTab] = useState('ALL ORDERS');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: userProfile, loading: userLoading } = useAuth();
  
    const tabs = ['ALL ORDERS', 'PENDING', 'COMPLETED', 'CANCELLED'];

    // Map order status codes to human-readable strings and tab names
    const statusMap = {
        0: 'PENDING',
        1: 'COMPLETED',
        2: 'CANCELLED'
    };


    // useEffect(() => {
    // const fetchUserProfile = async () => {
    //     try {
    //     setUserLoading(true);

    //     const token = localStorage.getItem('token');
        
    //     // Make sure the API endpoint is correct
    //     const response = await fetch('/users/me', {
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //     }
    //     });

    //     if (!response.ok) {
    //         // Check content type before trying to parse as JSON
    //         const contentType = response.headers.get('content-type');
            
    //         if (contentType && contentType.includes('application/json')) {
    //         const errorData = await response.json();
    //         console.error('Server error:', errorData);
    //         } else {
    //         const errorText = await response.text();
    //         console.error('Error response (not JSON):', errorText);
    //         }
            
    //         throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
    //     }

    //     // Verify we got JSON before parsing
    //     const contentType = response.headers.get('content-type');
    //     if (!contentType || !contentType.includes('application/json')) {
    //         console.error('Unexpected content type:', contentType);
    //         throw new Error('Server returned non-JSON response');
    //     }

    //     const userData = await response.json();
    //     setUserProfile(userData);
    //     } catch (err) {
    //     console.error('Error fetching user profile:', err);
    //     setUserProfile(null);
    //     } finally {
    //     setUserLoading(false);
    //     }
    // };

    // fetchUserProfile();
    // }, []);

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const orderDetails = await OrderService.getOrdersByUser();

            // Debug log: print all product images from fetched orders
            orderDetails.forEach(order => {
            console.log('Order product image:', order.product?.image);
            });

            const processedOrders = orderDetails.map(order => {
            const items = order.products.map(p => {
                const product = p.productID || {};
                return {
                name: product.productName || 'Product Name',
                price: product.productPrice || 50,
                quantity: p.quantity || 1,
                image: product.productImage || null
                };
            });

            const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            return {
                id: order._id || order.transactionID,
                status: statusMap[order.orderStatus] || 'UNKNOWN',
                dateOrdered: new Date(order.dateOrdered).toLocaleDateString(),
                items,
                total: `₱${totalAmount.toFixed(2)}`
            };
            });

            setOrders(processedOrders);
        } catch (err) {
            setError('Failed to fetch orders. Please try again later.');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
        };



        if (userProfile) {
            fetchOrders();
        }
    }, [userProfile]);

    // Filter orders based on active tab
    const filteredOrders = activeTab === 'ALL ORDERS' 
        ? orders 
        : orders.filter(order => order.status === activeTab);

    // Handle order cancellation
    const handleCancelOrder = async (orderId) => {
        try {
            await OrderService.cancelOrder(orderId);
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.id === orderId 
                    ? { ...order, status: 'CANCELLED' } 
                    : order
                )
            );
        } catch (err) {
            console.error('Error cancelling order:', err);
            alert('Failed to cancel order. Please try again later.');
        }
    };

    return (
        <div className="harvest-container">
            <Header />

            <div className="main-content">
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                    <div className="avatar-placeholder"></div>
                    </div>
                    <h2 className="profile-name">
                    {userLoading ? 'Loading...' : (userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : 'User not found')}
                    </h2>
                    <p className="profile-email">{userProfile?.email || ''}</p>
                </div>

                <div className="orders-container">
                    <h1 className="page-title">My Orders</h1>
          
                    <div className="tabs-container">
                        {tabs.map(tab => (
                            <button 
                            key={tab} 
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                            >
                            {tab}
                            </button>
                        ))}
                    </div>

                    <div className="orders-list">
                        {loading ? (
                            <div className="loading-message">Loading your orders...</div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="empty-message">No {activeTab !== 'ALL ORDERS' ? activeTab.toLowerCase() : ''} orders found.</div>
                        ) : (
                        filteredOrders.map((order, index) => (
                        <div key={index} className="order-card">
                            <div className="order-header">
                                <h3 className="order-id">ORDER #{order.id}</h3>
                                <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                  
                            <div className="order-content">
                                {order.items && order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="order-item">
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
                                ))}
                    
                            <div className="order-footer">
                                {order.status === 'PENDING' && (
                                <button 
                                    className="cancel-button"
                                    onClick={() => handleCancelOrder(order.id)}
                                >
                                    Cancel Order
                                </button>
                                )}
                                <div className="order-total">
                                TOTAL {order.total}
                                </div>
                            </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};






