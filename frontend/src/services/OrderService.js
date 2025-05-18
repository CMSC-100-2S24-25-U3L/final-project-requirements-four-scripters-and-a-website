// frontend/services/OrderService.js
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
  createOrder: async (orderData) => {
    const res = await axios.post(BASE_URL, orderData, getAuthHeader());
    return res.data;
  },

  getOrderById: async (transactionID) => {
    const res = await axios.get(`${BASE_URL}/${transactionID}`, getAuthHeader());
    return res.data;
  },

  updateOrder: async (transactionID, orderStatus) => {
    const res = await axios.put(`${BASE_URL}/${transactionID}`, { orderStatus }, getAuthHeader());
    return res.data;
  },

  deleteOrder: async (transactionID) => {
    const res = await axios.delete(`${BASE_URL}/${transactionID}`, getAuthHeader());
    return res.data;
  },

  getOrdersByUser: async () => {
    const res = await axios.get(BASE_URL, getAuthHeader());
    return res.data;
  },

  getOrdersWithProducts: async () => {
    const res = await axios.post(`${BASE_URL}/with-products`, {}, getAuthHeader());
    return res.data;
  }
};

export default OrderService;
