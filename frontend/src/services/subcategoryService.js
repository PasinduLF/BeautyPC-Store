import api from './api';

export const fetchSubcategories = (params = {}) => api.get('/subcategories', { params });

export const createSubcategory = (payload) => api.post('/subcategories', payload);

export const updateSubcategory = (id, payload) => api.put(`/subcategories/${id}`, payload);

export const deleteSubcategory = (id) => api.delete(`/subcategories/${id}`);

