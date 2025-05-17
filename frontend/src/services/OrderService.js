// frontend/services/OrderService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/orders"; 

const OrderService = {
  createOrder: async (orderData) => {
    const res = await axios.post(BASE_URL, orderData);
    return res.data;
  },

  getOrderById: async (transactionID) => {
    const res = await axios.get(`${BASE_URL}/${transactionID}`);
    return res.data;
  },

  updateOrder: async (transactionID, orderStatus) => {
    const res = await axios.put(`${BASE_URL}/${transactionID}`, { orderStatus });
    return res.data;
  },

  deleteOrder: async (transactionID) => {
    const res = await axios.delete(`${BASE_URL}/${transactionID}`);
    return res.data;
  },

    getOrdersByUser: async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(BASE_URL, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    });
    return res.data;
    },

  getOrdersWithProducts: async () => {
    const res = await axios.post(`${BASE_URL}/with-products`);
    return res.data;
  }

};

export default OrderService;