import { useState, useEffect } from 'react';
import Header from "../components/Header";
import OrderService from '../services/OrderService';

export default function ProfilePage () {
  const [activeTab, setActiveTab] = useState('ALL ORDERS');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  const tabs = ['ALL ORDERS', 'PENDING', 'COMPLETED', 'CANCELLED'];

  // Map order status codes to human-readable strings and tab names
  const statusMap = {
    0: 'PENDING',
    1: 'COMPLETED',
    2: 'CANCELLED'
  };

    useEffect(() => {
    const fetchUserProfile = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
        console.warn("No user email found in localStorage");
        setUserLoading(false);
        return;
        }

        try {
        const res = await fetch(`http://localhost:3000/users/${email}`);
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUserProfile(data);
        localStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
        } catch (err) {
        console.error('Error fetching user profile:', err);
        } finally {
        setUserLoading(false);
        }
    };

    fetchUserProfile();
    }, []);



  useEffect(() => {
    const fetchOrders = async () => {
      if (!userProfile?.email) return;

      try {
        setLoading(true);
        setError(null);

        const orderDetails = await OrderService.getOrdersByUser(userProfile.email);

        // Debug log: print all product images from fetched orders
        orderDetails.forEach(order => {
            console.log('Order product image:', order.product?.image);
        });

        const processedOrders = orderDetails.map(order => {
          // order.products is an array; each product has productID with details and quantity
          const items = order.products.map(p => {
            const product = p.productID || {};
            return {
              name: product.productName || 'Product Name',
              price: product.productPrice || 50,  // number, default 50
              quantity: p.quantity || 1,
              image: product.productImage || null
            };
          });

          // Calculate total price for the order
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







// import { useState, useEffect } from 'react';
// import Header from "../components/Header";
// import OrderService from '../services/OrderService';

// export default function ProfilePage () {
//   const [activeTab, setActiveTab] = useState('ALL ORDERS');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
  
//   const tabs = ['ALL ORDERS', 'PENDING', 'COMPLETED', 'CANCELLED'];

//   // Map order status codes to human-readable strings and tab names
//   const statusMap = {
//     0: 'PENDING',
//     1: 'COMPLETED',
//     2: 'CANCELLED'
//   };

//   useEffect(() => {
//     // Function to fetch user profile - in a real app, this would come from your auth system
//     const fetchUserProfile = async () => {
//       try {
//         // For demonstration, we're setting a mock user
//         // In a real app, you would get this from your authentication system
//         setUserProfile({
//           name: 'John Doe',
//           email: 'john.doe@gmail.com'
//         });
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//       }
//     };
    
//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     // Function to fetch orders from the database
//     const fetchOrders = async () => {
//         if (!userProfile?.email) return;

//         try {
//             setLoading(true);
//             setError(null);

//             const orderDetails = await OrderService.getOrdersByUser(userProfile.email);

//             const processedOrders = orderDetails.map(order => {
//             const product = order.product || {};

//             return {
//                 id: order.transactionID,
//                 status: statusMap[order.orderStatus] || 'UNKNOWN',
//                 dateOrdered: new Date(order.dateOrdered).toLocaleDateString(),
//                 items: [{
//                 name: product.name || 'Product Name',
//                 price: product.price ? `₱${product.price}/kg` : '₱50.00/kg',
//                 quantity: order.orderQuantity,
//                 image: product.image || null
//                 }],
//                 total: `₱${(order.orderQuantity * (product.price || 50)).toFixed(2)}`
//             };
//             });

//             setOrders(processedOrders);
//         } catch (err) {
//             setError('Failed to fetch orders. Please try again later.');
//             console.error('Error fetching orders:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (userProfile) {
//       fetchOrders();
//     }
//   }, [userProfile]);

//   // Filter orders based on active tab
//   const filteredOrders = activeTab === 'ALL ORDERS' 
//     ? orders 
//     : orders.filter(order => order.status === activeTab);

//   // Handle order cancellation
//   const handleCancelOrder = async (orderId) => {
//     try {
//       // Call our service to cancel the order
//       await OrderService.cancelOrder(orderId);
      
//       // Update the local state to reflect the cancellation
//       setOrders(prevOrders => 
//         prevOrders.map(order => 
//           order.id === orderId 
//             ? {...order, status: 'CANCELLED'} 
//             : order
//         )
//       );
//     } catch (err) {
//       console.error('Error cancelling order:', err);
//       alert('Failed to cancel order. Please try again later.');
//     }
//   };

//   return (
//     <div className="harvest-container">
//       <Header />

//       {/* Main Content */}
//       <div className="main-content">
//         {/* User Profile Sidebar */}
//         <div className="profile-sidebar">
//           <div className="profile-avatar">
//             <div className="avatar-placeholder"></div>
//           </div>
//           <h2 className="profile-name">{userProfile?.name || 'Loading...'}</h2>
//           <p className="profile-email">{userProfile?.email || ''}</p>
//         </div>

//         {/* Orders Content */}
//         <div className="orders-container">
//           <h1 className="page-title">My Orders</h1>
          
//           {/* Tab Navigation */}
//           <div className="tabs-container">
//             {tabs.map(tab => (
//               <button 
//                 key={tab} 
//                 className={`tab-button ${activeTab === tab ? 'active' : ''}`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* Orders List */}
//           <div className="orders-list">
//             {loading ? (
//               <div className="loading-message">Loading your orders...</div>
//             ) : error ? (
//               <div className="error-message">{error}</div>
//             ) : filteredOrders.length === 0 ? (
//               <div className="empty-message">No {activeTab !== 'ALL ORDERS' ? activeTab.toLowerCase() : ''} orders found.</div>
//             ) : (
//               filteredOrders.map((order, index) => (
//                 <div key={index} className="order-card">
//                   {/* Order Header */}
//                   <div className="order-header">
//                     <h3 className="order-id">ORDER #{order.id}</h3>
//                     <span className={`status-badge ${order.status.toLowerCase()}`}>
//                       {order.status}
//                     </span>
//                   </div>
                  
//                   {/* Order Items */}
//                   <div className="order-content">
//                     {order.items && order.items.map((item, itemIndex) => (
//                       <div key={itemIndex} className="order-item">
//                         <div className="item-image"></div>
//                         <div className="item-details">
//                           <h4 className="item-name">{item.name}</h4>
//                           <div className="item-meta">
//                             <span className="item-price">PRICE {item.price}</span>
//                             <span className="item-quantity">QTY: {item.quantity}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                    
//                     {/* Order Actions & Total */}
//                     <div className="order-footer">
//                       {order.status === 'PENDING' && (
//                         <button 
//                           className="cancel-button"
//                           onClick={() => handleCancelOrder(order.id)}
//                         >
//                           Cancel Order
//                         </button>
//                       )}
//                       <div className="order-total">
//                         TOTAL {order.total}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

