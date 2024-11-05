import axios from 'axios';
import { Product, Order, ShippingInfo } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = () => 
  api.get<Product[]>('/products').then(response => response.data);

export const getProduct = (id: number) => 
  api.get<Product>(`/products/${id}`).then(response => response.data);

export const createOrder = (order: { items: Order['items'], shipping: ShippingInfo }) => 
  api.post<{ orderId: string }>('/orders', order).then(response => response.data);

export const getOrder = (orderId: string) => 
  api.get<Order>(`/orders/${orderId}`).then(response => response.data);


export const processPayment = async (paymentDetails: {
  amount: number;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
}) => {
  try {
    const response = await axios.post('http://localhost:5000/api/payment', paymentDetails);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Payment failed');
    }
    throw new Error('Payment failed');
  }
};

// // Auth
// export const login = (credentials: { email: string; password: string }) => 
//   api.post<{ token: string; user: { id: string; email: string } }>('/auth/login', credentials)
//     .then(response => {
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     });

// export const register = (userData: { 
//   email: string; 
//   password: string; 
//   fullName: string;
// }) => 
//   api.post<{ token: string; user: { id: string; email: string } }>('/auth/register', userData)
//     .then(response => {
//       localStorage.setItem('token', response.data.token);
//       return response.data;
//     });

// export const logout = () => {
//   localStorage.removeItem('token');
//   return Promise.resolve();
// };

// Error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;