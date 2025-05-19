import { createContext, useState, useContext } from 'react';
import OrderService from '../services/OrderService'; 

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all orders of user for profile page
  const fetchOrders = async (userEmail) => {
    setLoading(true);
    try {
      const data = await OrderService.getOrdersByUser(userEmail); // Changed getAllOrdersByUser to getOrdersByUser
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Not yet used
  const updateOrderStatus = async (transactionID, orderStatus) => {
    try {
      const updatedOrder = await OrderService.updateOrderStatus(transactionID, orderStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.transactionID === transactionID ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Noy yet used
  const removeOrder = async (transactionID) => {
    try {
      await OrderService.deleteOrder(transactionID);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.transactionID !== transactionID)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, updateOrderStatus, removeOrder, loading }}>
      {children}
    </OrderContext.Provider>
  );
}