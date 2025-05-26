import axios from "axios";

const BASE_URL = "http://localhost:3000/orders";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const OrderService = {
    // Used in cart to submit an order
    createOrder: async (orderData) => {
        const res = await axios.post(BASE_URL, orderData, getAuthHeader());
        return res.data;
    },

    // Not used yet
    getOrderById: async (transactionID) => { 
        const res = await axios.get(`${BASE_URL}/${transactionID}`, getAuthHeader());
        return res.data;
    },

    // Not used yet
    updateOrder: async (transactionID, orderStatus) => {
        const res = await axios.put(`${BASE_URL}/${transactionID}/update`, { orderStatus }, getAuthHeader());
        return res.data;
    },

    // Not used yet
    deleteOrder: async (transactionID) => {
        const res = await axios.delete(`${BASE_URL}/${transactionID}`, getAuthHeader());
        return res.data;
    },

    // Used by profile to display all orders of user
    getOrdersByUser: async () => {
        const res = await axios.get(BASE_URL, getAuthHeader());
        return res.data;
    },

    // Used in profile to cancel an order 
    cancelOrder: async (transactionID) => {
        const res = await axios.put(`${BASE_URL}/${transactionID}/cancel`, {}, getAuthHeader());
        return res.data;
    },

    // For fetching all orders (for admin/manager)
    getAllOrders: async () => {
        const res = await axios.get(`${BASE_URL}/all`, getAuthHeader());
        return res.data;
    },

};

export default OrderService;
