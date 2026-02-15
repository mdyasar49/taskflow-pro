import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = API_BASE_URL;

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
        }
        return response.data;
    },
    register: async (username, password) => {
        return await api.post('/auth/register', { username, password });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    },
    getCurrentUser: () => {
        return localStorage.getItem('username');
    }
};

export const taskService = {
    getAllTasks: async (page = 0, size = 10, status = 'All') => {
        const response = await api.get('/tasks', {
            params: { page, size, status }
        });
        return response.data;
    },
    createTask: async (task) => {
        const response = await api.post('/tasks', task);
        return response.data;
    },
    updateTask: async (id, task) => {
        const response = await api.put(`/tasks/${id}`, task);
        return response.data;
    },
    deleteTask: async (id) => {
        await api.delete(`/tasks/${id}`);
    }
};

export default api;
