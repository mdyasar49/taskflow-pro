import axios from "axios";
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/tasks`;

export const getTasks = () => axios.get(API_URL);
export const createTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const login = (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials);
