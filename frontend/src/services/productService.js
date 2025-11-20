import api from './api';

export const fetchProducts = (params = {}) => api.get('/products', { params });

export const fetchProduct = (id) => api.get(`/products/${id}`);

export const createProduct = (payload) => api.post('/products', payload);

export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

