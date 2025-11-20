import api from './api';

export const placeOrder = (payload) => api.post('/orders', payload);

export const fetchOrders = (params = {}) => api.get('/orders', { params });

export const fetchOrder = (id) => api.get(`/orders/${id}`);

export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });

export const fetchOrderSummary = () => api.get('/orders/dashboard/summary');

