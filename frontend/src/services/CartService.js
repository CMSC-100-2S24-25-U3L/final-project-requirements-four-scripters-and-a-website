import axios from 'axios';

const BASE_URL = "http://localhost:3000/cart";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};


const CartService = {
  getCart: async () => {
    const res = await axios.get(BASE_URL, getAuthHeader());
    return res.data;
  },

  saveCart: async (products) => {
    const res = await axios.post(BASE_URL, { products }, getAuthHeader());
    return res.data;
  },

  clearCart: async () => {
    const res = await axios.delete(BASE_URL, getAuthHeader());
    return res.data;
  }
};

export default CartService;